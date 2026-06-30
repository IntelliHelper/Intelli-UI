import bundledRegistry from "../registry/bundled.json" with { type: "json" };
import type { Registry, RegistryItem } from "../types.js";
import { DEFAULT_REGISTRY_URL } from "./config.js";

const bundled = bundledRegistry as Registry;

export function getRegistryUrl(registryUrl?: string): string {
  return registryUrl?.replace(/\/$/, "") ?? DEFAULT_REGISTRY_URL;
}

export async function fetchRegistry(registryUrl?: string): Promise<Registry> {
  const url = getRegistryUrl(registryUrl);

  try {
    const response = await fetch(`${url}/registry.json`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as Registry;
  } catch {
    return bundled;
  }
}

export async function fetchRegistryItem(
  name: string,
  registryUrl?: string,
): Promise<RegistryItem | null> {
  const registry = await fetchRegistry(registryUrl);
  const item = registry.items.find((entry) => entry.name === name);
  if (!item) {
    return null;
  }

  const url = getRegistryUrl(registryUrl);

  try {
    const response = await fetch(`${url}/${name}.json`);
    if (!response.ok) {
      return item;
    }
    return (await response.json()) as RegistryItem;
  } catch {
    return item;
  }
}

export function listRegistryItems(registry: Registry): RegistryItem[] {
  return registry.items.filter((item) => item.type.startsWith("registry:"));
}

export function resolveRegistryDependencies(
  item: RegistryItem,
  registry: Registry,
): RegistryItem[] {
  const resolved: RegistryItem[] = [];
  const visited = new Set<string>();

  function visit(name: string) {
    if (visited.has(name)) {
      return;
    }
    visited.add(name);

    const dependency = registry.items.find((entry) => entry.name === name);
    if (!dependency) {
      return;
    }

    for (const dep of dependency.registryDependencies ?? []) {
      visit(dep);
    }

    resolved.push(dependency);
  }

  for (const dep of item.registryDependencies ?? []) {
    visit(dep);
  }

  visit(item.name);

  return resolved;
}