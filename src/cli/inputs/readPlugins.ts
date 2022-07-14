import inquirer from "inquirer";
import { UserInput } from "../readInput";

export default async function readPlugins(choices: string[]) {
  const { plugins } = await inquirer.prompt<Pick<UserInput, "plugins">>({
    name: "plugins",
    type: "checkbox",
    message: "Which plugins would you like to include?",
    choices: choices.map((dependency) => ({
      name: dependency,
      checked: false,
    })),
  });

  return plugins;
}
