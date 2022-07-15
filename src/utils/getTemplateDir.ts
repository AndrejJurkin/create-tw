import { PKG_ROOT } from "./../constants";
import { UserInput } from "./../cli/readInput";
import path from "path";

export default function getTemplateDir(input: UserInput) {
  const { language, appType } = input;
  const languageDir = language === "TypeScript" ? "ts" : "js";

  // TODO: Extend user input to allow for multiple app types
  return path.join(PKG_ROOT, "templates", languageDir, appType, "default");
}
