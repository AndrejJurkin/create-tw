import { UserInput } from "../config.js";

export function createNuxtCommand(input: UserInput) {
  const { appConfig } = input;

  // npx --yes is to automatically accept the prompt to install latest version
  const parts: string[] = ["npx --yes"];

  parts.push("nuxi init");
  parts.push(input.projectName);

  if (appConfig.language === "ts") {
    parts.push("--ts");
  }

  return parts.join(" ");
}
