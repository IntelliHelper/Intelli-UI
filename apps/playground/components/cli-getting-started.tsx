"use client";

import { useState } from "react";

const commands = [
  {
    label: "Initialize",
    command: "npx @intelli/cli@latest init",
    description: "Create components.json in your project",
  },
  {
    label: "Add components",
    command: "npx @intelli/cli@latest add button card tabs",
    description: "Install one or more components (utils are added automatically)",
  },
  {
    label: "Interactive add",
    command: "npx @intelli/cli@latest add",
    description: "Pick components from a list when you omit names",
  },
  {
    label: "List available",
    command: "npx @intelli/cli@latest list",
    description: "See all registry components and what is installed",
  },
  {
    label: "Update",
    command: "npx @intelli/cli@latest update",
    description: "Pull registry updates; prompts before overwriting local edits",
  },
] as const;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-lg border border-border/60 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function CliGettingStarted() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Copy source into your app with the Intelli UI CLI. Components are fetched
        from{" "}
        <a
          href="https://ui.intellihelper.in/r/registry.json"
          className="font-medium text-foreground underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          ui.intellihelper.in
        </a>
        .
      </p>

      <div className="space-y-3">
        {commands.map((item) => (
          <div
            key={item.command}
            className="rounded-xl border border-border/50 bg-background/30 p-4"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <CopyButton text={item.command} />
            </div>
            <pre className="overflow-x-auto rounded-lg bg-background/60 px-3 py-2 font-mono text-xs text-foreground">
              <code>{item.command}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}