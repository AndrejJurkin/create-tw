import { UserInput } from "../cli/readInput.js";
import path from "path";
import { PKG_ROOT } from "../constants.js";

export function getTailwindTemplateDir({ appId }: UserInput) {
  return path.join(PKG_ROOT, "src", "templates", appId);
}
