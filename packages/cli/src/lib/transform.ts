import type { IntelliConfig } from "../types.js";

const INTELLI_UTILS_IMPORT =
  /import\s*\{([^}]+)\}\s*from\s*["']@intelli\/utils["'];?/g;

export function transformImports(
  content: string,
  config: IntelliConfig,
): string {
  let result = content.replace(INTELLI_UTILS_IMPORT, (_match, imports: string) => {
    const names = imports
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    const utilsNames: string[] = [];
    const focusRingNames: string[] = [];

    for (const name of names) {
      if (name === "focusRing") {
        focusRingNames.push(name);
      } else {
        utilsNames.push(name);
      }
    }

    const lines: string[] = [];

    if (utilsNames.length > 0) {
      lines.push(
        `import { ${utilsNames.join(", ")} } from "${config.aliases.utils}";`,
      );
    }

    if (focusRingNames.length > 0) {
      const focusRingImport = `${config.aliases.lib}/focus-ring`;
      lines.push(
        `import { ${focusRingNames.join(", ")} } from "${focusRingImport}";`,
      );
    }

    return lines.join("\n");
  });

  if (config.rsc === false) {
    result = result.replace(/^"use client";\s*\n?/m, "");
  }

  return result;
}