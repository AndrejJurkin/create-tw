import { resolvePacakgeManager } from "../../utils/resolvePackageManager.js";
import { UserInput } from "../config.js";

export function createNextCommand(input: UserInput) {
  const { appConfig, packageManager } = input;

  // npx --yes is to automatically accept the prompt to install latest version
  const parts: string[] = [resolvePacakgeManager(packageManager)];

  if (packageManager === "npm") {
    parts.push("create-next-app@latest");
  } else {
    parts.push("create next-app");
  }

  parts.push(input.projectName);

  if (appConfig.language === "ts") {
    if (packageManager === "npm" || packageManager === "pnpm") {
      parts.push("--ts");
    } else {
      parts.push("--typescript");
    }
  }

  return parts.join(" ");
}
