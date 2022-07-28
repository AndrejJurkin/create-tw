import { resolvePacakgeManager } from "../../utils/resolvePackageManager.js";
import { UserInput } from "../config.js";

export function createViteCommand(input: UserInput) {
  const { packageManager, appConfig, projectName } = input;

  const parts: string[] = [resolvePacakgeManager(packageManager)];

  if (packageManager === "npm") {
    parts.push("create-vite@latest");
  } else {
    parts.push("create vite");
  }

  parts.push(projectName);
  parts.push("--template", appConfig.templateId);
  return parts.join(" ");
}
