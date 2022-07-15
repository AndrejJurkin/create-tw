import getPackageManager from "../utils/getPackageManager";
import getTemplateDir from "../utils/getTemplateDir";
import { UserInput } from "./../cli/readInput";

export default function createProject(input: UserInput) {
  const { appName, language, dependencies, plugins } = input;
  const packageManager = getPackageManager();
  const templateDir = getTemplateDir(input);

  console.log("Template dir:", templateDir);
}
