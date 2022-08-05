import { create } from "create-svelte";
import { UserInput } from "../config.js";

export default function createSvelteCommand(input: UserInput) {
  return create(input.projectName, {
    name: input.projectName,
    template: "skeleton",
    types: input.appConfig.language === "ts" ? "typescript" : null,
    prettier: false,
    eslint: true,
    playwright: false,
  });
}
