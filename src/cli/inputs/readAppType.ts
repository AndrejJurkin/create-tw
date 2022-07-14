import { AppType } from "./../readInput";
import inquirer from "inquirer";

export default async function readAppType(types: AppType[]) {
  const { appType } = await inquirer.prompt<{
    appType: AppType;
  }>({
    name: "appType",
    type: "list",
    message: "What type of application will you be creating?",
    choices: types.map((t) => ({
      name: t,
      value: t,
    })),
    default: "typescript",
  });

  return appType;
}
