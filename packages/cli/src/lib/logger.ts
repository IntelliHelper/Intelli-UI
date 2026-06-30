import pc from "picocolors";

export const logger = {
  info: (message: string) => console.log(pc.cyan("ℹ"), message),
  success: (message: string) => console.log(pc.green("✔"), message),
  warn: (message: string) => console.log(pc.yellow("⚠"), message),
  error: (message: string) => console.error(pc.red("✖"), message),
  break: () => console.log(),
};