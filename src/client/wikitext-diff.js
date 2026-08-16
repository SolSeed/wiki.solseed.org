/**
 * A small, dependency-free wikitext line differ intended for browser use.
 * It deliberately treats all input as text: parsing/rendering wikitext is
 * outside this module's scope.
 */

function splitLines(value) {
  return String(value ?? "").split("\n");
}

function lcsPairs(before, after) {
  const rows = before.length + 1;
  const columns = after.length + 1;
  const table = Array.from({ length: rows }, () => new Uint32Array(columns));

  for (let beforeIndex = before.length - 1; beforeIndex >= 0; beforeIndex -= 1) {
    for (let afterIndex = after.length - 1; afterIndex >= 0; afterIndex -= 1) {
      table[beforeIndex][afterIndex] = before[beforeIndex] === after[afterIndex]
        ? table[beforeIndex + 1][afterIndex + 1] + 1
        : Math.max(table[beforeIndex + 1][afterIndex], table[beforeIndex][afterIndex + 1]);
    }
  }

  const pairs = [];
  let beforeIndex = 0;
  let afterIndex = 0;
  while (beforeIndex < before.length && afterIndex < after.length) {
    if (before[beforeIndex] === after[afterIndex]) {
      pairs.push([beforeIndex, afterIndex]);
      beforeIndex += 1;
      afterIndex += 1;
    } else if (table[beforeIndex + 1][afterIndex] >= table[beforeIndex][afterIndex + 1]) {
      beforeIndex += 1;
    } else {
      afterIndex += 1;
    }
  }
  return pairs;
}

function tokenSegments(before, after) {
  const beforeTokens = before.match(/\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu) ?? [];
  const afterTokens = after.match(/\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu) ?? [];
  const pairs = lcsPairs(beforeTokens, afterTokens);
  const oldSegments = [];
  const newSegments = [];
  let oldCursor = 0;
  let newCursor = 0;

  for (const [oldMatch, newMatch] of [...pairs, [beforeTokens.length, afterTokens.length]]) {
    if (oldCursor < oldMatch) oldSegments.push({ type: "delete", text: beforeTokens.slice(oldCursor, oldMatch).join("") });
    if (newCursor < newMatch) newSegments.push({ type: "add", text: afterTokens.slice(newCursor, newMatch).join("") });
    if (oldMatch < beforeTokens.length) {
      const text = beforeTokens[oldMatch];
      oldSegments.push({ type: "equal", text });
      newSegments.push({ type: "equal", text });
    }
    oldCursor = oldMatch + 1;
    newCursor = newMatch + 1;
  }
  return { oldSegments, newSegments };
}

function makeChange(deleted, added) {
  const oldLine = deleted.map((item) => item.oldLine).join("\n");
  const newLine = added.map((item) => item.newLine).join("\n");
  return {
    type: "change",
    oldLine,
    newLine,
    oldNumber: deleted[0]?.oldNumber ?? null,
    newNumber: added[0]?.newNumber ?? null,
    ...tokenSegments(oldLine, newLine),
  };
}

/** Build a stable model containing equal, add, delete, and change rows. */
export function buildLineDiff(beforeText, afterText) {
  const before = splitLines(beforeText);
  const after = splitLines(afterText);
  const matches = lcsPairs(before, after);
  const raw = [];
  let beforeCursor = 0;
  let afterCursor = 0;

  for (const [beforeMatch, afterMatch] of [...matches, [before.length, after.length]]) {
    for (; beforeCursor < beforeMatch; beforeCursor += 1) {
      raw.push({ type: "delete", oldLine: before[beforeCursor], oldNumber: beforeCursor + 1, newNumber: null });
    }
    for (; afterCursor < afterMatch; afterCursor += 1) {
      raw.push({ type: "add", newLine: after[afterCursor], oldNumber: null, newNumber: afterCursor + 1 });
    }
    if (beforeMatch < before.length) {
      raw.push({ type: "equal", oldLine: before[beforeMatch], newLine: after[afterMatch], oldNumber: beforeMatch + 1, newNumber: afterMatch + 1 });
    }
    beforeCursor = beforeMatch + 1;
    afterCursor = afterMatch + 1;
  }

  const rows = [];
  for (let index = 0; index < raw.length;) {
    if (raw[index].type === "delete") {
      const deleted = [];
      while (raw[index]?.type === "delete") deleted.push(raw[index++]);
      const added = [];
      while (raw[index]?.type === "add") added.push(raw[index++]);
      rows.push(added.length ? makeChange(deleted, added) : ...deleted);
    } else {
      rows.push(raw[index++]);
    }
  }
  return rows;
}

function element(document, tagName, className, value) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

function appendSegments(document, parent, segments) {
  for (const segment of segments) {
    parent.append(element(document, "span", `wikitext-diff-${segment.type}`, segment.text));
  }
}

/** Render one combined view. Input may be a model or the two source strings. */
export function renderInlineDiff(document, modelOrBefore, afterText) {
  const model = Array.isArray(modelOrBefore) ? modelOrBefore : buildLineDiff(modelOrBefore, afterText);
  const root = element(document, "div", "wikitext-diff wikitext-diff-inline");
  for (const row of model) {
    const line = element(document, "div", `wikitext-diff-row wikitext-diff-${row.type}`);
    line.append(element(document, "span", "wikitext-diff-line-number", row.oldNumber ?? row.newNumber ?? ""));
    if (row.type === "change") {
      const oldPart = element(document, "span", "wikitext-diff-old");
      const newPart = element(document, "span", "wikitext-diff-new");
      appendSegments(document, oldPart, row.oldSegments);
      appendSegments(document, newPart, row.newSegments);
      line.append(oldPart, newPart);
    } else {
      line.append(element(document, "span", "wikitext-diff-text", row.oldLine ?? row.newLine));
    }
    root.append(line);
  }
  return root;
}

/** Render two aligned columns. Input may be a model or the two source strings. */
export function renderSplitDiff(document, modelOrBefore, afterText) {
  const model = Array.isArray(modelOrBefore) ? modelOrBefore : buildLineDiff(modelOrBefore, afterText);
  const root = element(document, "div", "wikitext-diff wikitext-diff-split");
  for (const row of model) {
    const rowNode = element(document, "div", `wikitext-diff-row wikitext-diff-${row.type}`);
    const oldCell = element(document, "div", "wikitext-diff-old");
    const newCell = element(document, "div", "wikitext-diff-new");
    oldCell.append(element(document, "span", "wikitext-diff-line-number", row.oldNumber ?? ""));
    newCell.append(element(document, "span", "wikitext-diff-line-number", row.newNumber ?? ""));
    if (row.type === "change") {
      appendSegments(document, oldCell, row.oldSegments);
      appendSegments(document, newCell, row.newSegments);
    } else {
      oldCell.append(element(document, "span", "wikitext-diff-text", row.oldLine ?? ""));
      newCell.append(element(document, "span", "wikitext-diff-text", row.newLine ?? ""));
    }
    rowNode.append(oldCell, newCell);
    root.append(rowNode);
  }
  return root;
}

function approvedRevisions(metadata) {
  const revisions = Array.isArray(metadata) ? metadata : metadata?.revisions;
  return Array.isArray(revisions) ? revisions.filter((revision) => revision?.approved === true) : [];
}

/** Validate that a requested pair exists in explicit, approved revision metadata. */
export function validateRevisionPair(metadata, beforeId, afterId) {
  if (beforeId === afterId) return { valid: false, code: "same-revision" };
  const revisions = approvedRevisions(metadata);
  const before = revisions.find((revision) => revision.id === beforeId);
  const after = revisions.find((revision) => revision.id === afterId);
  if (!before || !after) return { valid: false, code: "unknown-or-unapproved-revision" };
  return { valid: true, before, after };
}

/** Select a validated arbitrary pair, throwing only for invalid caller input. */
export function selectRevisionPair(metadata, beforeId, afterId) {
  const result = validateRevisionPair(metadata, beforeId, afterId);
  if (!result.valid) throw new RangeError(`Invalid revision pair: ${result.code}`);
  return { before: result.before, after: result.after };
}
