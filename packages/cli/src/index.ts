#!/usr/bin/env node

import { Command } from "commander";
import { runAdd } from "./commands/add.js";
import { runInit } from "./commands/init.js";
import { runList } from "./commands/list.js";
import { runDiff, runUpdate } from "./commands/update.js";
import { logger } from "./lib/logger.js";

const program = new Command();

program
  .name("intelli-ui")
  .description("Add and update Intelli UI components in your project")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize components.json in your project")
  .option("-y, --yes", "Use default values without prompts")
  .action(async (options: { yes?: boolean }) => {
    try {
      await runInit({ cwd: process.cwd(), yes: options.yes });
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Component names to add")
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-o, --overwrite", "Overwrite existing files without prompting")
  .option("--dry-run", "Preview changes without writing files")
  .action(async (components: string[], options: { yes?: boolean; overwrite?: boolean; dryRun?: boolean }) => {
    try {
      await runAdd({
        cwd: process.cwd(),
        components,
        yes: options.yes,
        overwrite: options.overwrite,
        dryRun: options.dryRun,
      });
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command("update")
  .description("Update installed components from the registry")
  .argument("[components...]", "Component names to update (default: all installed)")
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-o, --overwrite", "Overwrite local modifications without prompting")
  .option("--skip-modified", "Skip files with local modifications")
  .option("--dry-run", "Preview changes without writing files")
  .action(async (components: string[], options: { yes?: boolean; overwrite?: boolean; skipModified?: boolean; dryRun?: boolean }) => {
    try {
      await runUpdate({
        cwd: process.cwd(),
        components,
        yes: options.yes,
        overwrite: options.overwrite,
        skipModified: options.skipModified,
        dryRun: options.dryRun,
      });
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command("diff")
  .description("Show differences between installed files and the registry")
  .argument("[components...]", "Component names to diff (default: all installed)")
  .action(async (components: string[]) => {
    try {
      await runDiff({ cwd: process.cwd(), components });
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List available or installed components")
  .option("--installed", "List only installed components")
  .action(async (options: { installed?: boolean }) => {
    try {
      await runList({ cwd: process.cwd(), installed: options.installed });
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();