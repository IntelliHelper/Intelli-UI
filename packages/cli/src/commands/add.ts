import type { RegistryItem } from "../types.js";
import { readConfig } from "../lib/config.js";
import {
  applyPlans,
  buildInstallPlans,
  installDependencies,
} from "../lib/installer.js";
import { logger } from "../lib/logger.js";
import { readManifest } from "../lib/manifest.js";
import { resolvePaths } from "../lib/paths.js";
import {
  confirmOverwrite,
  promptModifiedFile,
  promptSelectComponents,
} from "../lib/prompts.js";
import {
  fetchRegistry,
  fetchRegistryItem,
  resolveRegistryDependencies,
} from "../lib/registry.js";

type AddOptions = {
  cwd: string;
  components: string[];
  overwrite?: boolean;
  yes?: boolean;
  dryRun?: boolean;
};

export async function runAdd(options: AddOptions): Promise<void> {
  const { cwd, components, overwrite, yes, dryRun } = options;
  const config = readConfig(cwd);
  const paths = resolvePaths(cwd, config);
  const registry = await fetchRegistry(config.registry);

  let targets = components;

  if (targets.length === 0) {
    if (!process.stdin.isTTY) {
      logger.error(
        "Please specify at least one component. Example: npx @intelli/cli add button",
      );
      logger.info("Run `npx @intelli/cli list` to see available components.");
      process.exit(1);
    }

    const manifest = readManifest(cwd);
    const available = registry.items
      .filter((item) => item.type === "registry:ui")
      .map((item) => ({
        name: item.name,
        description: item.description ?? item.title,
        installed: Boolean(manifest.components[item.name]),
      }));

    if (available.length === 0) {
      logger.error("No components found in registry.");
      process.exit(1);
    }

    targets = await promptSelectComponents(available);

    if (targets.length === 0) {
      logger.warn("No components selected.");
      return;
    }
  }

  const itemsToInstall = new Map<string, RegistryItem>();

  for (const name of targets) {
    const item = await fetchRegistryItem(name, config.registry);
    if (!item) {
      logger.error(`Component "${name}" not found in registry.`);
      process.exit(1);
    }

    for (const resolved of resolveRegistryDependencies(item, registry)) {
      itemsToInstall.set(resolved.name, resolved);
    }
  }

  for (const item of itemsToInstall.values()) {
    logger.info(`Adding ${item.name}...`);

    const plans = buildInstallPlans(item, {
      cwd,
      config,
      paths,
      registry,
      overwrite,
      yes,
      dryRun,
    });

    const modified = plans.filter((plan) => plan.status === "modified");
    if (modified.length > 0 && !overwrite && !yes) {
      for (const plan of modified) {
        const choice = await promptModifiedFile(plan);
        if (choice === "abort") {
          logger.warn("Add cancelled.");
          return;
        }
        if (choice === "overwrite") {
          await applyPlans(
            item,
            [plan],
            {
              cwd,
              config,
              paths,
              registry,
              overwrite: true,
              yes,
              dryRun,
            },
          );
        }
      }

      const remaining = plans.filter(
        (plan) =>
          plan.status !== "modified" &&
          plan.status !== "unchanged",
      );

      if (remaining.length > 0) {
        await applyPlans(item, remaining, {
          cwd,
          config,
          paths,
          registry,
          overwrite,
          yes,
          dryRun,
        });
      }
    } else {
      if (modified.length > 0 && !overwrite && yes) {
        const proceed = await confirmOverwrite(
          `${modified.length} file(s) will be overwritten and local changes will be lost. Continue?`,
          false,
        );
        if (!proceed) {
          logger.warn("Add cancelled.");
          return;
        }
      }

      await applyPlans(item, plans, {
        cwd,
        config,
        paths,
        registry,
        overwrite: overwrite || yes,
        yes,
        dryRun,
      });
    }

    if (!dryRun) {
      installDependencies(item, cwd, dryRun);
    }
  }

  logger.success("Done.");
}