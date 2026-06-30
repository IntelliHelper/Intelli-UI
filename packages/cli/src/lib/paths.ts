import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { IntelliConfig, ResolvedPaths } from "../types.js";

type TsConfig = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
};

function findTsConfig(cwd: string): string | null {
  let current = cwd;
  while (true) {
    const tsconfig = join(current, "tsconfig.json");
    if (existsSync(tsconfig)) {
      return tsconfig;
    }
    const parent = dirname(current);
    if (parent === current) {
      return null;
    }
    current = parent;
  }
}

function resolveAliasPath(
  aliasPath: string,
  cwd: string,
  tsconfigPath: string | null,
): string {
  if (!aliasPath.startsWith("@/")) {
    return resolve(cwd, aliasPath);
  }

  const subpath = aliasPath.slice(2);

  if (tsconfigPath) {
    const tsconfig = JSON.parse(
      readFileSync(tsconfigPath, "utf8"),
    ) as TsConfig;
    const baseUrl = tsconfig.compilerOptions?.baseUrl ?? ".";
    const paths = tsconfig.compilerOptions?.paths ?? {};
    const tsconfigDir = dirname(tsconfigPath);

    for (const [pattern, targets] of Object.entries(paths)) {
      const starIndex = pattern.indexOf("*");
      if (starIndex === -1) {
        continue;
      }

      const prefix = pattern.slice(0, starIndex);
      const suffix = pattern.slice(starIndex + 1);

      if (!aliasPath.startsWith(prefix) || !aliasPath.endsWith(suffix)) {
        continue;
      }

      const matched = aliasPath.slice(prefix.length, aliasPath.length - suffix.length);
      const target = targets[0];
      if (!target) {
        continue;
      }

      const resolvedTarget = target.replace("*", matched);
      return resolve(tsconfigDir, baseUrl, resolvedTarget);
    }
  }

  return resolve(cwd, "src", subpath);
}

export function resolvePaths(cwd: string, config: IntelliConfig): ResolvedPaths {
  const tsconfigPath = findTsConfig(cwd);

  return {
    cwd,
    components: resolveAliasPath(config.aliases.components, cwd, tsconfigPath),
    ui: resolveAliasPath(config.aliases.ui, cwd, tsconfigPath),
    lib: resolveAliasPath(config.aliases.lib, cwd, tsconfigPath),
    utils: resolveAliasPath(config.aliases.utils, cwd, tsconfigPath),
    hooks: resolveAliasPath(
      config.aliases.hooks ?? `${config.aliases.lib}/hooks`,
      cwd,
      tsconfigPath,
    ),
  };
}

export function resolveTargetPath(
  target: string,
  paths: ResolvedPaths,
  config: IntelliConfig,
): string {
  if (target.startsWith("components/ui/")) {
    const relativePath = target.replace("components/ui/", "");
    return join(paths.ui, relativePath);
  }

  if (target.startsWith("components/")) {
    const relativePath = target.replace("components/", "");
    return join(paths.components, relativePath);
  }

  if (target.startsWith("lib/")) {
    const relativePath = target.replace("lib/", "");
    return join(paths.lib, relativePath);
  }

  if (target.startsWith("hooks/")) {
    const relativePath = target.replace("hooks/", "");
    return join(paths.hooks, relativePath);
  }

  return resolve(paths.cwd, target);
}

