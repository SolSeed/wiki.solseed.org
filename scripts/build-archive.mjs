#!/usr/bin/env node
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { renderMarkdown } from "../src/markdown/render.mjs";

const ID = /^[1-9]\d*$/;
const esc = (value) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const id = (value, label) => {
  const result = String(value ?? "");
  if (!ID.test(result)) throw new Error(`${label} must be a positive numeric ID`);
  return result;
};
const optionalId = (value, label) => value === null || value === undefined ? null : id(value, label);
const route = (value, label) => {
  const result = String(value ?? "").replace(/^\/+|\/+$/g, "");
  const parts = result.split("/");
  if (!result || result.includes("\\") || parts.some((part) => !part || part === "." || part === ".." || part.includes("\0"))) throw new Error(`${label} is not a safe route`);
  return parts;
};
const href = (parts) => `/${parts.map(encodeURIComponent).join("/")}`;
const readJson = async (filename) => JSON.parse(await readFile(filename, "utf8"));
const hash = (text) => createHash("sha256").update(Buffer.from(text)).digest("hex");
const put = async (filename, contents) => { await mkdir(dirname(filename), { recursive: true }); await writeFile(filename, contents, "utf8"); };
const putRoute = (out, parts, html) => put(join(out, ...parts, "index.html"), html);
const iso = (timestamp) => { const value = new Date(timestamp); if (Number.isNaN(value.valueOf())) throw new Error(`invalid timestamp ${timestamp}`); return value.toISOString(); };
const pageRoute = (page) => route(page.canonical_path, `page ${page.page_id}.canonical_path`);
const revRoute = (page, revisionId) => ["revision", revisionId, ...pageRoute(page)];
const historyRoute = (page) => ["history", ...pageRoute(page)];
const diffRoute = (page) => ["diff", ...pageRoute(page)];
const sourceRoute = (page) => ["source", ...pageRoute(page)];

const css = `:root{font-family:system-ui,sans-serif;line-height:1.5}body{max-width:78rem;margin:auto;padding:1rem}a{color:#05c}nav ul{display:flex;flex-wrap:wrap;gap:.75rem 1.5rem;padding:0;list-style:none}.metadata{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:.25rem 1rem}.metadata dt{font-weight:bold}.metadata dd{margin:0}.wiki,.source{white-space:pre-wrap;overflow-wrap:anywhere;overflow:auto;border:1px solid #888;padding:1rem}.table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{border:1px solid #888;padding:.4rem;text-align:start;vertical-align:top}fieldset{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}.help{flex-basis:100%}.diff-output{min-height:8rem;border:1px dashed #888;padding:1rem}.wikitext-diff{font-family:ui-monospace,monospace;font-size:.9rem;overflow:auto}.wikitext-diff-row{display:grid;white-space:pre-wrap;overflow-wrap:anywhere}.wikitext-diff-split .wikitext-diff-row{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.wikitext-diff-inline .wikitext-diff-row{grid-template-columns:4rem minmax(0,1fr)}.wikitext-diff-old,.wikitext-diff-new{display:block;padding:.2rem .4rem}.wikitext-diff-delete .wikitext-diff-old,.wikitext-diff-change .wikitext-diff-old,.wikitext-diff-delete{background:#fee}.wikitext-diff-add .wikitext-diff-new,.wikitext-diff-change .wikitext-diff-new,.wikitext-diff-add{background:#e8ffe8}.wikitext-diff-line-number{display:inline-block;min-width:3rem;color:#555;user-select:none}.wikitext-diff-delete:not(.wikitext-diff-row),.wikitext-diff-old .wikitext-diff-delete{text-decoration:line-through;background:#fbb}.wikitext-diff-add:not(.wikitext-diff-row),.wikitext-diff-new .wikitext-diff-add{background:#afa}@media(max-width:48rem){.wikitext-diff-split .wikitext-diff-row{grid-template-columns:1fr}}`;
const controls = `import{renderInlineDiff,renderSplitDiff,selectRevisionPair}from'/assets/wikitext-diff.js';
const shell=document.querySelector('[data-diff-shell]');
const form=document.querySelector('[data-diff-controls]');
const status=document.querySelector('[data-diff-status]');
const result=document.querySelector('[data-diff-result]');
const params=new URLSearchParams(location.search);
const from=params.get('from'),to=params.get('to'),mode=params.get('mode')==='inline'?'inline':'split';
if(form&&from)form.elements.from.value=from;
if(form&&to)form.elements.to.value=to;
if(form&&form.elements.mode)form.elements.mode.value=mode;
const getJson=async url=>{const response=await fetch(url);if(!response.ok)throw new Error('metadata fetch failed');return response.json()};
const getText=async url=>{const response=await fetch(url);if(!response.ok)throw new Error('revision fetch failed');return response.text()};
if(shell&&from&&to){
  const pageId=encodeURIComponent(shell.dataset.pageId);
  getJson('/archive-data/pages/'+pageId+'/page.json').then(async page=>{
    const pair=selectRevisionPair(page,from,to);
    const base='/archive-data/pages/'+pageId+'/revisions/';
    const texts=await Promise.all([getText(base+encodeURIComponent(pair.before.revision_id)+'.'+(pair.before.source_extension||'wiki')),getText(base+encodeURIComponent(pair.after.revision_id)+'.'+(pair.after.source_extension||'wiki'))]);
    if(status)status.textContent='Revision '+from+' compared with revision '+to+'.';
    if(result)result.replaceChildren(mode==='inline'?renderInlineDiff(document,...texts):renderSplitDiff(document,...texts));
  }).catch(()=>{if(status)status.textContent='That revision pair is not public for this page.';if(result)result.replaceChildren()});
}`;
const archiveNotice = `<aside class="archive-notice" aria-label="Archive notice">This is a static archive of the SolSeed wiki as it existed in 2018. All spam has been removed.</aside>`;
const documentHtml = (title, body, scripts = false) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><link rel="stylesheet" href="/assets/history.css"></head><body>${archiveNotice}${body}${scripts ? '<script type="module" src="/assets/history-controls.js"></script>' : ""}</body></html>\n`;
const nav = (page, extras = []) => `<nav aria-label="Archive navigation"><ul><li><a href="${href(pageRoute(page))}">Current page</a></li><li><a href="${href(historyRoute(page))}">History</a></li>${extras.map((item) => `<li>${item}</li>`).join("")}</ul></nav>`;
const meta = (revision, delta = null) => `<dl class="metadata"><dt>Date</dt><dd><time datetime="${esc(iso(revision.timestamp))}">${esc(iso(revision.timestamp))}</time></dd><dt>Author</dt><dd>${esc(revision.author || "Unknown")}</dd><dt>Comment</dt><dd>${esc(revision.comment || "(no comment)")}</dd><dt>Size</dt><dd>${revision.wikitext_bytes} bytes</dd><dt>Delta</dt><dd>${delta === null ? "—" : `${delta > 0 ? "+" : ""}${delta} bytes`}</dd></dl>`;
const options = (revisions, selected) => revisions.map((revision) => `<option value="${esc(revision.revision_id)}"${revision.revision_id === selected ? " selected" : ""}>${esc(revision.revision_id)} — ${esc(revision.timestamp)}</option>`).join("");

async function loadPage(source, pageId) {
  const page = await readJson(join(source, "pages", pageId, "page.json"));
  id(page.page_id, `page ${pageId}.page_id`); page.page_id = String(page.page_id); pageRoute(page);
  if (!Array.isArray(page.revisions) || !page.revisions.length) throw new Error(`page ${pageId}.revisions must be non-empty`);
  const revisions = []; let prior = 0;
  for (const compact of page.revisions) {
    const revisionId = id(compact.revision_id, "revision ID");
    if (Number(revisionId) <= prior) throw new Error(`page ${pageId}.revisions must be oldest first`); prior = Number(revisionId);
    const metadata = await readJson(join(source, "pages", pageId, "revisions", revisionId, "revision.json"));
    if (id(metadata.revision_id, "revision metadata ID") !== revisionId) throw new Error(`revision ${revisionId} metadata does not match its directory`);
    const sourceFormat = metadata.source_format ?? compact.source_format ?? "wikitext";
    if (!new Set(["wikitext", "markdown"]).has(sourceFormat)) throw new Error(`revision ${revisionId} has unsupported source_format ${sourceFormat}`);
    const extension = sourceFormat === "markdown" ? "md" : "wiki";
    const text = await readFile(join(source, "pages", pageId, "revisions", revisionId, `source.${extension}`), "utf8");
    const bytes = Buffer.byteLength(text); const digest = hash(text);
    const declaredBytes = sourceFormat === "markdown" ? metadata.markdown_bytes ?? compact.markdown_bytes : metadata.wikitext_bytes ?? compact.wikitext_bytes;
    const declaredHash = sourceFormat === "markdown" ? metadata.markdown_sha256 ?? compact.markdown_sha256 : metadata.wikitext_sha256 ?? compact.wikitext_sha256;
    if (Number(declaredBytes) !== bytes) throw new Error(`revision ${revisionId} has incorrect ${sourceFormat}_bytes`);
    if (declaredHash && declaredHash !== digest) throw new Error(`revision ${revisionId} has incorrect ${sourceFormat}_sha256`);
    const merged = {
      ...compact,
      ...metadata,
      revision_id: revisionId,
      original_parent_revision_id: optionalId(metadata.original_parent_revision_id ?? compact.original_parent_revision_id, "original parent revision ID"),
      previous_public_revision_id: optionalId(metadata.previous_public_revision_id ?? compact.previous_public_revision_id, "previous public revision ID"),
      next_public_revision_id: optionalId(metadata.next_public_revision_id ?? compact.next_public_revision_id, "next public revision ID"),
      wikitext_bytes: bytes,
      wikitext_sha256: digest,
      source_format: sourceFormat,
      source_extension: extension,
    };
    iso(merged.timestamp); if (!("author" in merged)) throw new Error(`revision ${revisionId} has no author`);
    revisions.push({ ...merged, source: text });
  }
  const ids = new Set(revisions.map((revision) => revision.revision_id));
  revisions.forEach((revision, index) => {
    const previous = index ? revisions[index - 1].revision_id : null; const next = index + 1 < revisions.length ? revisions[index + 1].revision_id : null;
    if ((revision.previous_public_revision_id ?? null) !== previous || (revision.next_public_revision_id ?? null) !== next) throw new Error(`revision ${revision.revision_id} has invalid public navigation`);
  });
  page.current_revision_id = id(page.current_revision_id, `page ${pageId}.current_revision_id`);
  if (!ids.has(page.current_revision_id)) throw new Error(`page ${pageId}.current_revision_id is not public`);
  page.revisions = revisions; return page;
}

const revisionHtml = (page, revision, previous, next) => {
  const links = [];
  links.push(previous ? `<a rel="prev" href="${href(revRoute(page, previous.revision_id))}">Previous revision</a>` : "<span aria-disabled=\"true\">Previous revision</span>");
  links.push(next ? `<a rel="next" href="${href(revRoute(page, next.revision_id))}">Next revision</a>` : "<span aria-disabled=\"true\">Next revision</span>");
  links.push(`<a href="${href([...revRoute(page, revision.revision_id), "source"])}">View source</a>`);
  if (previous) links.push(`<a href="${href(diffRoute(page))}?from=${previous.revision_id}&amp;to=${revision.revision_id}">Compare with previous</a>`);
  const delta = previous ? revision.wikitext_bytes - previous.wikitext_bytes : null;
  const contents = revision.source_format === "markdown" ? renderMarkdown(revision.source) : esc(revision.source);
  const label = revision.source_format === "markdown" ? "Page content" : "Wikitext content";
  return documentHtml(`${page.display_title} — revision ${revision.revision_id}`, `<main>${nav(page, links)}<h1>${esc(page.display_title)}</h1><p>Revision <code>${esc(revision.revision_id)}</code></p>${meta(revision, delta)}${revision.historical_note ? `<aside><h2>Historical note</h2><p>${esc(revision.historical_note)}</p></aside>` : ""}<article class="wiki" aria-label="${label}">${contents}</article></main>`);
};

const sourceHtml = (page, revision) => documentHtml(`Source: ${page.display_title} revision ${revision.revision_id}`, `<main>${nav(page, [`<a href="${href(revRoute(page, revision.revision_id))}">Revision ${revision.revision_id}</a>`])}<h1>Source: ${esc(page.display_title)}</h1>${meta(revision)}<pre class="source" tabindex="0"><code>${esc(revision.source)}</code></pre></main>`);

const historyHtml = (page) => {
  const newest = [...page.revisions].reverse(); const first = newest[0]; const last = newest.at(-1);
  const rows = newest.map((revision) => {
    const previous = page.revisions.find((item) => item.revision_id === revision.previous_public_revision_id);
    const delta = previous ? revision.wikitext_bytes - previous.wikitext_bytes : null;
    const revisionHref = href(revRoute(page, revision.revision_id));
    return `<tr><th scope="row"><a href="${revisionHref}">Revision ${revision.revision_id}</a></th><td><time datetime="${esc(iso(revision.timestamp))}">${esc(iso(revision.timestamp))}</time></td><td>${esc(revision.author || "Unknown")}</td><td>${esc(revision.comment || "(no comment)")}</td><td>${revision.wikitext_bytes} bytes</td><td>${delta === null ? "—" : `${delta > 0 ? "+" : ""}${delta} bytes`}</td><td><a href="${revisionHref}/source">Source</a></td></tr>`;
  }).join("");
  const controls = `<form action="${href(diffRoute(page))}" method="get" data-diff-controls data-page-id="${page.page_id}"><fieldset><legend>Compare two public revisions</legend><label for="from-revision">From</label><select id="from-revision" name="from" required>${options(newest, first.revision_id)}</select><label for="to-revision">To</label><select id="to-revision" name="to" required>${options(newest, last.revision_id)}</select><input type="hidden" name="mode" value="split"><button type="submit">Compare revisions</button><p class="help" id="comparison-help">Choose any two approved public revisions.</p></fieldset></form>`;
  return documentHtml(`${page.display_title} — revision history`, `<main>${nav(page)}<h1>${esc(page.display_title)} history</h1><p>Public revisions are shown newest first. Excluded revisions are represented only by gap metadata.</p>${controls}<div class="table-wrap"><table><caption>Public revision history</caption><thead><tr><th scope="col">Revision</th><th scope="col">Date</th><th scope="col">Author</th><th scope="col">Comment</th><th scope="col">Size</th><th scope="col">Delta</th><th scope="col">Text</th></tr></thead><tbody>${rows}</tbody></table></div></main>`, true);
};

const diffHtml = (page) => {
  const revisions = [...page.revisions].reverse();
  return documentHtml(`${page.display_title} — compare revisions`, `<main data-diff-shell data-page-id="${page.page_id}">${nav(page, [`<a href="${href(historyRoute(page))}">Choose from history</a>`])}<h1>Compare ${esc(page.display_title)} revisions</h1><form action="${href(diffRoute(page))}" method="get" data-diff-controls data-page-id="${page.page_id}"><fieldset><legend>Revision pair</legend><label for="from-revision">From</label><select id="from-revision" name="from" required>${options(revisions, revisions[1]?.revision_id || revisions[0].revision_id)}</select><label for="to-revision">To</label><select id="to-revision" name="to" required>${options(revisions, revisions[0].revision_id)}</select><label for="diff-mode">Mode</label><select id="diff-mode" name="mode"><option value="split">Split</option><option value="inline">Inline</option></select><button type="submit">Load comparison</button></fieldset></form><section class="diff-output" aria-live="polite"><h2>Comparison</h2><p data-diff-status>Choose two revisions to load the wikitext comparison.</p><div data-diff-result></div></section></main>`, true);
};

const landingHtml = (pages) => documentHtml("SolSeed Wiki Archive", `<main><h1>SolSeed Wiki Archive</h1><p>Public historical pages preserved from the SolSeed archive.</p><ul>${pages.map((page) => `<li><a href="${href(pageRoute(page))}">${esc(page.display_title)}</a> — <a href="${href(historyRoute(page))}">history</a></li>`).join("")}</ul></main>`);

async function discover(source, manifest) {
  if (Array.isArray(manifest.pages)) return manifest.pages.map((entry) => id(typeof entry === "object" ? entry.page_id : entry, "manifest page ID"));
  const entries = await readdir(join(source, "pages"), { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory() && ID.test(entry.name)).map((entry) => entry.name).sort((a, b) => Number(a) - Number(b));
}

export async function buildArchive({ sourceDir = "_source", outputDir = "site", pageIds = null } = {}) {
  const source = resolve(sourceDir); const output = resolve(outputDir); const manifest = await readJson(join(source, "manifest.json"));
  if (manifest.schema_version !== undefined && Number(manifest.schema_version) !== 1) throw new Error(`unsupported schema_version ${manifest.schema_version}`);
  const requested = pageIds ? new Set(pageIds.map((value) => id(value, "requested page ID"))) : null;
  const discovered = await discover(source, manifest);
  if (requested) for (const pageId of requested) if (!discovered.includes(pageId)) throw new Error(`requested page ${pageId} is not in the manifest`);
  const pages = []; for (const pageId of discovered) if (!requested || requested.has(pageId)) pages.push(await loadPage(source, pageId));
  await mkdir(output, { recursive: true });
  if (!requested) for (const generated of ["index.html", "history", "revision", "diff", "source", "archive-data", "assets/history.css", "assets/history-controls.js", "assets/wikitext-diff.js"]) await rm(join(output, generated), { recursive: true, force: true });
  await put(join(output, "assets/history.css"), css); await put(join(output, "assets/history-controls.js"), controls);
  await rm(join(output, "assets", "uploads"), { recursive: true, force: true });
  try { await cp(join(source, "media"), join(output, "assets", "uploads"), { recursive: true }); } catch (error) { if (error.code !== "ENOENT") throw error; }
  await put(join(output, "assets/wikitext-diff.js"), await readFile(new URL("../src/client/wikitext-diff.js", import.meta.url), "utf8"));
  if (!requested) await putRoute(output, [], landingHtml(pages));
  for (const page of pages) {
    const current = page.revisions.find((revision) => revision.revision_id === page.current_revision_id);
    await putRoute(output, pageRoute(page), revisionHtml(page, current, page.revisions.find((r) => r.revision_id === current.previous_public_revision_id), page.revisions.find((r) => r.revision_id === current.next_public_revision_id)));
    await putRoute(output, historyRoute(page), historyHtml(page)); await putRoute(output, diffRoute(page), diffHtml(page)); await putRoute(output, sourceRoute(page), sourceHtml(page, current));
    for (let index = 0; index < page.revisions.length; index += 1) {
      const revision = page.revisions[index]; const previous = page.revisions[index - 1] || null; const next = page.revisions[index + 1] || null; const revisionPath = revRoute(page, revision.revision_id);
      await putRoute(output, revisionPath, revisionHtml(page, revision, previous, next)); await putRoute(output, [...revisionPath, "source"], sourceHtml(page, revision));
    }
    const archive = join(output, "archive-data", "pages", page.page_id);
    const publicPage = { ...page, revisions: page.revisions.map(({ source: _source, ...revision }) => revision) };
    await put(join(archive, "page.json"), `${JSON.stringify(publicPage, null, 2)}\n`);
    for (const revision of page.revisions) await put(join(archive, "revisions", `${revision.revision_id}.${revision.source_extension}`), revision.source);
  }
  return { pages: pages.map((page) => page.page_id), outputDir: output };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , sourceDir = "_source", outputDir = "site", ...pageIds] = process.argv;
  buildArchive({ sourceDir, outputDir, pageIds: pageIds.length ? pageIds : null }).then((result) => console.log(`Rendered ${result.pages.length} page(s) into ${result.outputDir}`)).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
