import { UserInput } from "./../readInput";
import inquirer from "inquirer";

export default async function readDependencies(choices: string[]) {
  const { dependencies } = await inquirer.prompt<
    Pick<UserInput, "dependencies">
  >({
    name: "dependencies",
    type: "checkbox",
    message: "Which dependencies would you like to include?",
    choices: choices.map((dependency) => ({
      name: dependency,
      checked: false,
    })),
  });

  return dependencies;
}
