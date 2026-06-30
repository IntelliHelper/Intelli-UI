import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import type { IntelliConfig } from "../types.js";

const configSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().optional(),
  rsc: z.boolean().optional(),
  tsx: z.boolean().optional(),
  tailwind: z
    .object({
      config: z.string().optional(),
      css: z.string().optional(),
      baseColor: z.string().optional(),
      cssVariables: z.boolean().optional(),
    })
    .optional(),
  iconLibrary: z.string().optional(),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string(),
    lib: z.string(),
    hooks: z.string().optional(),
  }),
  registry: z.string().optional(),
});

export const CONFIG_FILE = "components.json";
export const DEFAULT_REGISTRY_URL = "https://intelli-ui.dev/r";

export function getConfigPath(cwd: string): string {
  return join(cwd, CONFIG_FILE);
}

export function configExists(cwd: string): boolean {
  return existsSync(getConfigPath(cwd));
}

export function readConfig(cwd: string): IntelliConfig {
  const configPath = getConfigPath(cwd);
  if (!existsSync(configPath)) {
    throw new Error(
      `Missing ${CONFIG_FILE}. Run \`npx intelli-ui init\` to create one.`,
    );
  }

  const raw = JSON.parse(readFileSync(configPath, "utf8")) as unknown;
  return configSchema.parse(raw);
}

export function writeConfig(cwd: string, config: IntelliConfig): void {
  writeFileSync(getConfigPath(cwd), `${JSON.stringify(config, null, 2)}\n`);
}

export function createDefaultConfig(
  overrides: Partial<IntelliConfig> = {},
): IntelliConfig {
  return {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "intelli-glass",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: "app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
    },
    iconLibrary: "lucide",
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
    registry: DEFAULT_REGISTRY_URL,
    ...overrides,
  };
}