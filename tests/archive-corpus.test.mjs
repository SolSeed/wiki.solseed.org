import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const source = resolve("_source");
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

test("the complete 2018 corpus has maintainable Markdown pages and no spam revisions", async () => {
  const manifest = await readJson(join(source, "manifest.json"));
  assert.equal(manifest.page_count, 1790);
  assert.equal(manifest.pages.length, 1790);
  assert.equal(manifest.original_revision_count, 5533);
  assert.equal(manifest.published_revision_count, 5511);
  assert.equal(manifest.excluded_spam_revision_count, 22);
  assert.equal(manifest.site_revision_count, 1790);
  assert.equal(manifest.media_count, 350);
  assert.equal(manifest.missing_media_count, 0);
  assert.equal(new Set(manifest.pages.map(({ page_id }) => String(page_id))).size, 1790);

  const namespaces = new Map();
  for (const summary of manifest.pages) {
    namespaces.set(summary.namespace_id, (namespaces.get(summary.namespace_id) ?? 0) + 1);
    const page = await readJson(join(source, "pages", String(summary.page_id), "page.json"));
    const current = page.revisions.find(({ revision_id }) => String(revision_id) === String(page.current_revision_id));
    assert.equal(current.source_format, "markdown", page.display_title);
    assert.equal(current.revision_origin, "site", page.display_title);
    const markdown = await readFile(join(source, "pages", String(page.page_id), "revisions", String(current.revision_id), "source.md"), "utf8");
    assert.doesNotMatch(markdown, /\{\{/, `${page.display_title} has an unresolved template`);
    assert.doesNotMatch(markdown, /(?:action=(?:edit|submit)|Special:(?:UserLogin|CreateAccount))/i, `${page.display_title} has an active wiki control`);
  }
  assert.deepEqual(Object.fromEntries([...namespaces].sort((a, b) => a[0] - b[0])), {
    0: 1345, 1: 26, 2: 31, 3: 17, 4: 3, 6: 352,
    7: 2, 8: 3, 10: 7, 12: 2, 14: 2,
  });
  assert.equal((await readdir(join(source, "media"))).length, 350);
});
