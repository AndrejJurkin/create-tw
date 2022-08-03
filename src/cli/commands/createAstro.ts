import { UserInput } from "./../config";

export function createAstroCommand(input: UserInput) {
  const { packageManager, projectName } = input;

  const parts: string[] = [
    packageManager,
    packageManager === "npm" ? "init" : "create",
    "astro",
    projectName,
    "-- --template with-tailwindcss",
  ];

  return parts.join(" ");
}
