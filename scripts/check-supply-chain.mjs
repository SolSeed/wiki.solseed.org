#!/usr/bin/env node

import { lstat, readFile, readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const forbiddenFiles = new Set([
  "package.json",
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lock",
  "bun.lockb",
]);
const ignoredDirectories = new Set([".git", "_site"]);
const automationRoots = [".github/workflows/", ".githooks/", "scripts/"];
const packageCommand = /(^|[\s;&|`])(npm|npx|pnpm|yarn|bun|bunx)(?=$|[\s;&|`])/m;
const actionReference = /^\s*(?:-\s*)?uses:\s*([^\s#]+)(?:\s*#.*)?$/gm;
const fullCommit = /^[^/@\s]+\/[^/@\s]+@[0-9a-f]{40}$/;

const unixPath = (value) => value.split("\\").join("/");

async function walk(root, directory, errors) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = resolve(directory, entry.name);
    const path = unixPath(relative(root, absolute));

    if (entry.isDirectory()) {
      if (entry.name === "node_modules") {
        errors.push(`${path}: dependency directory is forbidden`);
        continue;
      }
      if (!ignoredDirectories.has(entry.name)) await walk(root, absolute, errors);
      continue;
    }

    if (forbiddenFiles.has(entry.name)) {
      errors.push(`${path}: package manifest or lockfile is forbidden`);
      continue;
    }

    const metadata = await lstat(absolute);
    const contents = await readFile(absolute);
    if ((metadata.mode & 0o111) !== 0 && contents.includes(0)) {
      errors.push(`${path}: executable binary file is forbidden`);
    }

    const isAutomation = automationRoots.some((prefix) => path.startsWith(prefix));
    const isPolicyScript = path === "scripts/check-supply-chain.mjs";
    if (isAutomation && !isPolicyScript) {
      const text = contents.toString("utf8");
      if (packageCommand.test(text)) errors.push(`${path}: package-manager execution is forbidden`);
    }

    if (path.startsWith(".github/workflows/")) {
      const text = contents.toString("utf8");
      for (const match of text.matchAll(actionReference)) {
        const reference = match[1];
        if (!reference.startsWith("./") && !fullCommit.test(reference)) {
          errors.push(`${path}: action must use a full 40-character commit SHA: ${reference}`);
        }
      }
    }
  }
}

export async function checkSupplyChain(rootDirectory) {
  const root = resolve(rootDirectory);
  const errors = [];
  await walk(root, root, errors);
  return errors.sort();
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  const errors = await checkSupplyChain(process.argv[2] || ".");
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Supply-chain policy passed.");
  }
}
