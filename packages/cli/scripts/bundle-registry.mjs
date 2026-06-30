#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = resolve(__dirname, "../../..");
const scriptPath = join(monorepoRoot, "scripts/bundle-registry.mjs");

const result = spawnSync(process.execPath, [scriptPath, "--target=cli"], {
  stdio: "inherit",
});

process.exit(result.status ?? 1);