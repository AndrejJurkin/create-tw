import inquirer from "inquirer";
import validateAppName from "../../utils/validateAppName";
import { UserInput } from "../readInput";

export default async function readAppName(defaults: UserInput) {
  const { appName } = await inquirer.prompt<Pick<UserInput, "appName">>({
    name: "appName",
    type: "input",
    message: "What will your project be called?",
    default: defaults.appName,
    validate: validateAppName,
    transformer: (i: string) => {
      return i.trim();
    },
  });

  return appName;
}
