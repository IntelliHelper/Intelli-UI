export type RegistryFile = {
  path: string;
  type: string;
  target: string;
  content?: string;
};

export type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  meta?: Record<string, unknown>;
};

export type Registry = {
  name: string;
  homepage?: string;
  items: RegistryItem[];
};

export type IntelliConfig = {
  $schema?: string;
  style?: string;
  rsc?: boolean;
  tsx?: boolean;
  tailwind?: {
    config?: string;
    css?: string;
    baseColor?: string;
    cssVariables?: boolean;
  };
  iconLibrary?: string;
  aliases: {
    components: string;
    utils: string;
    ui: string;
    lib: string;
    hooks?: string;
  };
  registry?: string;
};

export type ResolvedPaths = {
  cwd: string;
  components: string;
  ui: string;
  lib: string;
  utils: string;
  hooks: string;
};

export type InstalledFileRecord = {
  path: string;
  hash: string;
};

export type InstalledComponent = {
  name: string;
  files: InstalledFileRecord[];
  dependencies?: string[];
  registryDependencies?: string[];
  installedAt: string;
  updatedAt: string;
};

export type InstalledManifest = {
  version: 1;
  registry: string;
  components: Record<string, InstalledComponent>;
};

export type FileUpdateStatus =
  | "new"
  | "unchanged"
  | "update-available"
  | "modified"
  | "missing";

export type FileUpdatePlan = {
  component: string;
  targetPath: string;
  absolutePath: string;
  status: FileUpdateStatus;
  currentContent?: string;
  nextContent: string;
};