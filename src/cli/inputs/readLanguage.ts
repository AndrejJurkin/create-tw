import inquirer from "inquirer";
import { Language } from "../readInput";

export default async function readLanguage() {
  const { language } = await inquirer.prompt<{ language: Language }>({
    name: "language",
    type: "list",
    message: "What language will your project be written in?",
    choices: [
      { name: "TypeScript", value: "TypeScript", short: "TypeScript" },
      { name: "JavaScript", value: "JavaScript", short: "JavaScript" },
    ],
    default: "typescript",
  });

  return language;
}
