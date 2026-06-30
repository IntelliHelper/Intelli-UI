import { configExists, readConfig } from "../lib/config.js";
import { logger } from "../lib/logger.js";
import { readManifest } from "../lib/manifest.js";
import { fetchRegistry, listRegistryItems } from "../lib/registry.js";

type ListOptions = {
  cwd: string;
  installed?: boolean;
};

export async function runList(options: ListOptions): Promise<void> {
  const { cwd, installed } = options;

  if (installed && !configExists(cwd)) {
    logger.error("No components.json found. Run `npx intelli-ui init` first.");
    process.exit(1);
  }

  const config = configExists(cwd) ? readConfig(cwd) : undefined;
  const registry = await fetchRegistry(config?.registry);
  const manifest = readManifest(cwd);

  if (installed) {
    const names = Object.keys(manifest.components);
    if (names.length === 0) {
      logger.info("No components installed yet.");
      return;
    }

    for (const name of names.sort()) {
      const component = manifest.components[name];
      if (!component) {
        continue;
      }
      console.log(`  ${name} (updated ${component.updatedAt})`);
    }
    return;
  }

  const items = listRegistryItems(registry);
  for (const item of items) {
    const isInstalled = manifest.components[item.name] ? "✓" : " ";
    console.log(`  [${isInstalled}] ${item.name} — ${item.description ?? item.title ?? ""}`);
  }
}