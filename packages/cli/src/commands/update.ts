import { readConfig } from "../lib/config.js";
import { formatDiff } from "../lib/diff.js";
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
  promptBulkModified,
  promptModifiedFile,
  type OverrideChoice,
} from "../lib/prompts.js";
import {
  fetchRegistry,
  fetchRegistryItem,
  resolveRegistryDependencies,
} from "../lib/registry.js";

type UpdateOptions = {
  cwd: string;
  components?: string[];
  overwrite?: boolean;
  yes?: boolean;
  skipModified?: boolean;
  dryRun?: boolean;
};

export async function runUpdate(options: UpdateOptions): Promise<void> {
  const { cwd, overwrite, yes, skipModified, dryRun } = options;
  const config = readConfig(cwd);
  const paths = resolvePaths(cwd, config);
  const registry = await fetchRegistry(config.registry);
  const manifest = readManifest(cwd);

  const installedNames = Object.keys(manifest.components);
  if (installedNames.length === 0) {
    logger.warn("No installed components found. Use `npx intelli-ui add` first.");
    return;
  }

  const targets =
    options.components && options.components.length > 0
      ? options.components
      : installedNames;

  for (const name of targets) {
    if (!manifest.components[name]) {
      logger.warn(`"${name}" is not installed. Skipping.`);
      continue;
    }

    const item = await fetchRegistryItem(name, config.registry);
    if (!item) {
      logger.error(`Component "${name}" not found in registry.`);
      continue;
    }

    const itemsToUpdate = resolveRegistryDependencies(item, registry).filter(
      (entry) => manifest.components[entry.name],
    );

    for (const resolved of itemsToUpdate) {
      logger.info(`Checking ${resolved.name} for updates...`);

      const plans = buildInstallPlans(resolved, {
        cwd,
        config,
        paths,
        registry,
        overwrite,
        yes,
        dryRun,
      });

      const actionable = plans.filter(
        (plan) => plan.status !== "unchanged",
      );

      if (actionable.length === 0) {
        logger.success(`${resolved.name} is already up to date.`);
        continue;
      }

      const modified = actionable.filter((plan) => plan.status === "modified");
      let bulkChoice: OverrideChoice | null = null;

      if (modified.length > 0 && !overwrite && !yes && !skipModified) {
        bulkChoice = await promptBulkModified(modified.length);

        if (bulkChoice === "abort") {
          logger.warn("Update cancelled.");
          return;
        }

        if (bulkChoice === "overwrite") {
          await applyPlans(resolved, actionable, {
            cwd,
            config,
            paths,
            registry,
            overwrite: true,
            yes,
            dryRun,
          });
          if (!dryRun) {
            installDependencies(resolved, cwd, dryRun);
          }
          continue;
        }
      }

      const shouldReviewEach = bulkChoice === "review";

      const applied = await applyPlans(resolved, actionable, {
        cwd,
        config,
        paths,
        registry,
        overwrite,
        yes,
        skipModified: skipModified || bulkChoice === "skip",
        dryRun,
        onModifiedFile:
          shouldReviewEach || (!overwrite && !yes && !skipModified && bulkChoice === null)
            ? promptModifiedFile
            : undefined,
      });

      if (!applied) {
        logger.warn("Update cancelled.");
        return;
      }

      if (!dryRun) {
        installDependencies(resolved, cwd, dryRun);
      }
    }
  }

  logger.success("Update complete.");
}

export async function runDiff(options: UpdateOptions): Promise<void> {
  const { cwd } = options;
  const config = readConfig(cwd);
  const paths = resolvePaths(cwd, config);
  const registry = await fetchRegistry(config.registry);
  const manifest = readManifest(cwd);

  const targets =
    options.components && options.components.length > 0
      ? options.components
      : Object.keys(manifest.components);

  if (targets.length === 0) {
    logger.warn("No components to diff.");
    return;
  }

  let hasChanges = false;

  for (const name of targets) {
    const item = await fetchRegistryItem(name, config.registry);
    if (!item) {
      logger.error(`Component "${name}" not found in registry.`);
      continue;
    }

    const plans = buildInstallPlans(item, {
      cwd,
      config,
      paths,
      registry,
    });

    const changed = plans.filter((plan) => plan.status !== "unchanged");
    if (changed.length === 0) {
      logger.info(`${name}: no changes`);
      continue;
    }

    hasChanges = true;
    logger.info(`${name}:`);

    for (const plan of changed) {
      const label =
        plan.status === "modified"
          ? "modified (local changes detected)"
          : plan.status;
      console.log(`  ${plan.targetPath} — ${label}`);
      if (plan.currentContent) {
        console.log(formatDiff(plan.currentContent, plan.nextContent, plan.targetPath));
      }
    }
  }

  if (!hasChanges) {
    logger.success("All components are up to date.");
  }
}