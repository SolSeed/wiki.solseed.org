import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const [, , outputArgument, shaArgument] = process.argv;

if (!outputArgument || !shaArgument) {
  console.error("Usage: node scripts/build-static-version.mjs <site-directory> <git-sha>");
  process.exit(1);
}

const version = (await readFile(new URL("../VERSION", import.meta.url), "utf8")).trim();
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

if (!semverPattern.test(version)) {
  throw new Error(`VERSION is not valid Semantic Versioning 2.0.0: ${version}`);
}

const gitSha = shaArgument.trim().toLowerCase();

if (!/^[0-9a-f]{40,64}$/.test(gitSha)) {
  throw new Error(`Expected a full Git commit SHA, received: ${shaArgument}`);
}

const destination = resolve(outputArgument, "static-version");
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>SolSeed site version ${version}</title>
</head>
<body>
  <main>
    <h1>SolSeed site version</h1>
    <p>Version: <strong>${version}</strong></p>
    <p>Git SHA: <code>${gitSha}</code></p>
  </main>
</body>
</html>
`;

await mkdir(destination, { recursive: true });
await writeFile(join(destination, "index.html"), html, "utf8");
console.log(`Generated /static-version for ${version} (${gitSha})`);
