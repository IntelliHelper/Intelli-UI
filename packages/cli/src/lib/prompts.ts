import { confirm, select } from "@inquirer/prompts";
import pc from "picocolors";
import type { FileUpdatePlan } from "../types.js";
import { formatDiff } from "./diff.js";

export type OverrideChoice = "overwrite" | "skip" | "abort" | "review";

export async function confirmOverwrite(
  message: string,
  defaultValue = false,
): Promise<boolean> {
  return confirm({
    message,
    default: defaultValue,
  });
}

export async function promptModifiedFile(
  plan: FileUpdatePlan,
): Promise<Exclude<OverrideChoice, "review">> {
  console.log();
  console.log(
    pc.yellow(
      `⚠  ${plan.targetPath} has local changes that differ from the last installed version.`,
    ),
  );
  console.log(pc.dim("Your customizations will be lost if you overwrite."));
  console.log();
  console.log(formatDiff(plan.currentContent ?? "", plan.nextContent, plan.targetPath));
  console.log();

  return select({
    message: `How do you want to proceed with ${pc.cyan(plan.targetPath)}?`,
    choices: [
      {
        name: "Skip — keep my local changes",
        value: "skip" as const,
      },
      {
        name: "Overwrite — replace with registry version (local changes will be lost)",
        value: "overwrite" as const,
      },
      {
        name: "Abort — cancel the entire operation",
        value: "abort" as const,
      },
    ],
  });
}

export async function promptBulkModified(
  modifiedCount: number,
): Promise<OverrideChoice> {
  return select({
    message: `${modifiedCount} file(s) have local modifications. What should we do?`,
    choices: [
      {
        name: "Review each file individually",
        value: "review" as const,
      },
      {
        name: "Overwrite all modified files (local changes will be lost)",
        value: "overwrite" as const,
      },
      {
        name: "Skip all modified files",
        value: "skip" as const,
      },
      {
        name: "Abort",
        value: "abort" as const,
      },
    ],
  });
}