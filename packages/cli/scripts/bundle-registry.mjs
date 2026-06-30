#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = resolve(__dirname, "..");
const monorepoRoot = resolve(cliRoot, "../..");
const registryPath = join(monorepoRoot, "apps/registry/registry.json");
const outputPath = join(cliRoot, "src/registry/bundled.json");

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

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`Bundled registry written to ${outputPath}`);