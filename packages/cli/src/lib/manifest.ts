import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { InstalledComponent, InstalledManifest } from "../types.js";
import { hashContent } from "./hash.js";

const MANIFEST_DIR = ".intelli-ui";
const MANIFEST_FILE = "installed.json";

export function getManifestPath(cwd: string): string {
  return join(cwd, MANIFEST_DIR, MANIFEST_FILE);
}

export function readManifest(cwd: string): InstalledManifest {
  const manifestPath = getManifestPath(cwd);
  if (!existsSync(manifestPath)) {
    return {
      version: 1,
      registry: "",
      components: {},
    };
  }

  return JSON.parse(readFileSync(manifestPath, "utf8")) as InstalledManifest;
}

export function writeManifest(cwd: string, manifest: InstalledManifest): void {
  const dir = join(cwd, MANIFEST_DIR);
  mkdirSync(dir, { recursive: true });
  writeFileSync(getManifestPath(cwd), `${JSON.stringify(manifest, null, 2)}\n`);
}

export function recordInstalledComponent(
  cwd: string,
  registryUrl: string,
  component: InstalledComponent,
): void {
  const manifest = readManifest(cwd);
  manifest.registry = registryUrl;
  manifest.components[component.name] = component;
  writeManifest(cwd, manifest);
}

export function createInstalledRecord(
  name: string,
  files: Array<{ path: string; content: string }>,
  dependencies?: string[],
  registryDependencies?: string[],
  existing?: InstalledComponent,
): InstalledComponent {
  const now = new Date().toISOString();

  return {
    name,
    files: files.map((file) => ({
      path: file.path,
      hash: hashContent(file.content),
    })),
    dependencies,
    registryDependencies,
    installedAt: existing?.installedAt ?? now,
    updatedAt: now,
  };
}