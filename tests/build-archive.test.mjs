import test from "node:test";
import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { buildArchive } from "../scripts/build-archive.mjs";

const fixture = resolve("tests/fixture-source");

test("renders the public page, history, revision, source, diff, and archive data routes", async () => {
  const output = await mkdtemp(join(tmpdir(), "solseed-render-") );
  try {
    const result = await buildArchive({ sourceDir: fixture, outputDir: output });
    assert.deepEqual(result.pages, ["1"]);
    for (const file of [
      "index.html",
      "SolSeed/index.html",
      "history/SolSeed/index.html",
      "revision/101/SolSeed/index.html",
      "revision/102/SolSeed/index.html",
      "revision/103/SolSeed/index.html",
      "revision/103/SolSeed/source/index.html",
      "source/SolSeed/index.html",
      "diff/SolSeed/index.html",
      "archive-data/pages/1/page.json",
      "archive-data/pages/1/revisions/101.wiki",
      "archive-data/pages/1/revisions/103.wiki",
    ]) assert.match(await readFile(join(output, file), "utf8"), /./, file);
    const history = await readFile(join(output, "history/SolSeed/index.html"), "utf8");
    assert.ok(history.indexOf("Revision 103") < history.indexOf("Revision 102"));
    assert.match(history, /From/); assert.match(history, /To/); assert.match(history, /Alice/); assert.match(history, /Preserve history/);
    const revision = await readFile(join(output, "revision/103/SolSeed/index.html"), "utf8");
    assert.match(revision, /Previous revision/); assert.match(revision, /View source/); assert.match(revision, /Citation review confirmed/);
    const diff = await readFile(join(output, "diff/SolSeed/index.html"), "utf8");
    assert.match(diff, /data-diff-shell/); assert.match(diff, /Choose two revisions/);
    const archivePage = JSON.parse(await readFile(join(output, "archive-data/pages/1/page.json"), "utf8"));
    assert.equal(archivePage.revisions.length, 3); assert.equal(archivePage.revisions[0].revision_id, "101");
    assert.equal(archivePage.revisions[0].source, undefined);
  } finally { await rm(output, { recursive: true, force: true }); }
});

test("rejects a source whose declared hash does not match", async () => {
  const output = await mkdtemp(join(tmpdir(), "solseed-render-invalid-output-"));
  const badFixture = await mkdtemp(join(tmpdir(), "solseed-source-invalid-"));
  try {
    await cp(fixture, badFixture, { recursive: true });
    const revisionFile = join(badFixture, "pages/1/revisions/103/revision.json");
    const revision = JSON.parse(await readFile(revisionFile, "utf8"));
    revision.wikitext_sha256 = "0".repeat(64);
    await writeFile(revisionFile, JSON.stringify(revision));
    await assert.rejects(() => buildArchive({ sourceDir: badFixture, outputDir: output }), /incorrect wikitext_sha256/);
  } finally {
    await rm(output, { recursive: true, force: true });
    await rm(badFixture, { recursive: true, force: true });
  }
});
