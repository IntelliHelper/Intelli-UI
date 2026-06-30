import { createTwoFilesPatch } from "diff";
import pc from "picocolors";

export function formatDiff(
  oldContent: string,
  newContent: string,
  filePath: string,
): string {
  const patch = createTwoFilesPatch(
    filePath,
    filePath,
    oldContent,
    newContent,
    "current",
    "registry",
  );

  return patch
    .split("\n")
    .map((line) => {
      if (line.startsWith("+++") || line.startsWith("---")) {
        return pc.bold(line);
      }
      if (line.startsWith("+")) {
        return pc.green(line);
      }
      if (line.startsWith("-")) {
        return pc.red(line);
      }
      if (line.startsWith("@@")) {
        return pc.cyan(line);
      }
      return line;
    })
    .join("\n");
}