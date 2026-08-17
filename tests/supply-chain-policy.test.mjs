import test from "node:test";
import assert from "node:assert/strict";
import { chmod, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkSupplyChain } from "../scripts/check-supply-chain.mjs";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function withFixture(files, callback) {
  const root = await mkdtemp(join(tmpdir(), "solseed-policy-"));
  try {
    for (const [path, contents] of Object.entries(files)) {
      const filename = join(root, path);
      await mkdir(dirname(filename), { recursive: true });
      await writeFile(filename, contents);
    }
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("the repository satisfies the supply-chain policy", async () => {
  assert.deepEqual(await checkSupplyChain(repository), []);
});

test("rejects package manifests, package execution, and mutable action tags", async () => {
  await withFixture({
    "package.json": "{}",
    ".github/workflows/build.yml": "steps:\n  - uses: actions/checkout@v6\n  - run: npx example\n",
  }, async (root) => {
    const errors = await checkSupplyChain(root);
    assert.ok(errors.some((error) => error.includes("package manifest")));
    assert.ok(errors.some((error) => error.includes("package-manager execution")));
    assert.ok(errors.some((error) => error.includes("full 40-character commit SHA")));
  });
});

test("allows checked-in source and SHA-pinned actions", async () => {
  await withFixture({
    "scripts/build.mjs": "console.log('build');\n",
    ".github/workflows/build.yml": "steps:\n  - uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2\n  - run: node scripts/build.mjs\n",
  }, async (root) => {
    assert.deepEqual(await checkSupplyChain(root), []);
  });
});

test("rejects executable binary files", async () => {
  await withFixture({ "tools/payload": Buffer.from([0, 1, 2, 3]) }, async (root) => {
    await chmod(join(root, "tools/payload"), 0o755);
    const errors = await checkSupplyChain(root);
    assert.ok(errors.some((error) => error.includes("executable binary")));
  });
});
