import { UserInput } from "./../cli/readInput";
import getTailwindConfigExtension from "./getFileExtension.js";

export default function getFileName(name: string, input: UserInput) {
  return `${name}.${getTailwindConfigExtension(input)}`;
}
