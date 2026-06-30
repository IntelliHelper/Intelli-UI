#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = resolve(__dirname, "..");
const registryPath = join(monorepoRoot, "apps/registry/registry.json");

const targets = process.argv.includes("--target=public")
  ? ["public"]
  : process.argv.includes("--target=cli")
    ? ["cli"]
    : ["cli", "public"];

if (!existsSync(registryPath)) {
  console.error(`Registry not found at ${registryPath}`);
  process.exit(1);
}

const registry = JSON.parse(readFileSync(registryPath, "utf8"));

for (const item of registry.items) {
  for (const file of item.files) {
    const sourcePath = join(monorepoRoot, file.path);
    if (!existsSync(sourcePath)) {
      console.error(`Source file not found: ${sourcePath}`);
      process.exit(1);
    }
    file.content = readFileSync(sourcePath, "utf8");
  }
}

if (targets.includes("cli")) {
  const outputPath = join(monorepoRoot, "packages/cli/src/registry/bundled.json");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`Bundled registry written to ${outputPath}`);
}

if (targets.includes("public")) {
  const publicDir = join(monorepoRoot, "apps/playground/public/r");
  rmSync(publicDir, { recursive: true, force: true });
  mkdirSync(publicDir, { recursive: true });

  writeFileSync(
    join(publicDir, "registry.json"),
    `${JSON.stringify(registry, null, 2)}\n`,
  );

  for (const item of registry.items) {
    writeFileSync(
      join(publicDir, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  }

  console.log(`Public registry written to ${publicDir}`);
}