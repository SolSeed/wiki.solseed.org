import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

// The production file is browser ESM. Loading its source as a data URL keeps
// this repository package-less while testing it with Node's ESM test runner.
const source = await readFile(new URL("../src/client/wikitext-diff.js", import.meta.url), "utf8");
const diff = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

test("buildLineDiff reports equal lines", () => {
  assert.deepEqual(diff.buildLineDiff("one\ntwo", "one\ntwo").map(({ type, oldLine }) => [type, oldLine]), [["equal", "one"], ["equal", "two"]]);
});

test("buildLineDiff reports additions, deletions, and changes with tokens", () => {
  assert.equal(diff.buildLineDiff("one", "one\ntwo").at(-1).type, "add");
  assert.equal(diff.buildLineDiff("one\ntwo", "one").at(-1).type, "delete");
  const [change] = diff.buildLineDiff("A small [[link]]", "A large [[link]]");
  assert.equal(change.type, "change");
  assert.ok(change.oldSegments.some((part) => part.type === "delete" && part.text === "small"));
  assert.ok(change.newSegments.some((part) => part.type === "add" && part.text === "large"));
});

test("empty input produces an equal empty line", () => {
  assert.deepEqual(diff.buildLineDiff("", ""), [{ type: "equal", oldLine: "", newLine: "", oldNumber: 1, newNumber: 1 }]);
});

test("revision pairs may be selected in either exported order", () => {
  const metadata = { revisions: [{ revision_id: "a" }, { revision_id: "b" }] };
  assert.equal(diff.selectRevisionPair(metadata, "b", "a").before.revision_id, "b");
  assert.deepEqual(diff.validateRevisionPair(metadata, "a", "missing"), { valid: false, code: "unknown-revision" });
  assert.throws(() => diff.selectRevisionPair(metadata, "a", "a"), /same-revision/);
});

test("renderer writes XSS-like wikitext as text", () => {
  const calls = [];
  const document = { createElement(tag) { return { tag, children: [], append(...nodes) { this.children.push(...nodes); }, set textContent(value) { calls.push(String(value)); this.value = String(value); } }; } };
  const payload = "<script>alert(1)</script><img src=x onerror=alert(2)>";
  diff.renderInlineDiff(document, payload, payload);
  assert.ok(calls.includes(payload));
});

test("moderately large input completes and preserves changed line", () => {
  const before = Array.from({ length: 350 }, (_, index) => `line ${index}`).join("\n");
  const after = before.replace("line 175", "line changed");
  const model = diff.buildLineDiff(before, after);
  assert.equal(model.length, 350);
  assert.equal(model.find((row) => row.type === "change").newLine, "line changed");
});
