import { confirm, input } from "@inquirer/prompts";
import { existsSync } from "node:fs";
import {
  configExists,
  createDefaultConfig,
  writeConfig,
} from "../lib/config.js";
import { logger } from "../lib/logger.js";

type InitOptions = {
  cwd: string;
  yes?: boolean;
};

export async function runInit(options: InitOptions): Promise<void> {
  const { cwd, yes } = options;

  if (configExists(cwd)) {
    const overwrite = yes
      ? true
      : await confirm({
          message: "components.json already exists. Overwrite?",
          default: false,
        });

    if (!overwrite) {
      logger.warn("Init cancelled.");
      return;
    }
  }

  const defaults = createDefaultConfig();

  const cssPath =
    yes || !process.stdin.isTTY
      ? defaults.tailwind?.css ?? "app/globals.css"
      : await input({
          message: "Where is your global CSS file?",
          default: defaults.tailwind?.css ?? "app/globals.css",
        });

  const utilsAlias =
    yes || !process.stdin.isTTY
      ? defaults.aliases.utils
      : await input({
          message: "Configure the import alias for utils:",
          default: defaults.aliases.utils,
        });

  const uiAlias =
    yes || !process.stdin.isTTY
      ? defaults.aliases.ui
      : await input({
          message: "Configure the import alias for UI components:",
          default: defaults.aliases.ui,
        });

  const rsc =
    yes || !process.stdin.isTTY
      ? true
      : await confirm({
          message: "Are you using React Server Components?",
          default: true,
        });

  const registry =
    yes || !process.stdin.isTTY
      ? defaults.registry
      : await input({
          message: "Registry URL:",
          default: defaults.registry,
        });

  if (!existsSync(cwd)) {
    throw new Error(`Directory does not exist: ${cwd}`);
  }

  const config = createDefaultConfig({
    rsc,
    registry,
    tailwind: {
      ...defaults.tailwind,
      css: cssPath,
    },
    aliases: {
      ...defaults.aliases,
      utils: utilsAlias,
      ui: uiAlias,
    },
  });

  writeConfig(cwd, config);
  logger.success("Created components.json");
  logger.info("Add components with: npx intelli-ui add <component>");
}