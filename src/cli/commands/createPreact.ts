import { UserInput } from "./../config";

export function createPreactCommand(input: UserInput) {
  const { packageManager, projectName } = input;

  const parts: string[] = [
    packageManager,
    packageManager === "npm" ? "init" : "create",
    "preact-cli create default",
    projectName,
  ];

  return parts.join(" ");
}
