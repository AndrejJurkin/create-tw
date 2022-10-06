import { UserInput } from "./../config";

export default function createSolidCommand(input: UserInput) {
  const { projectName } = input;
  const language = input.appConfig.language;

  const parts = ["npx", `degit solidjs/templates/${language}`, projectName];

  return parts.join(" ");
}
