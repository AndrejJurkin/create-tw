import { UserInput } from "./../cli/readInput";
import getFileExtension from "./getFileExtension.js";

export default function getFileName(name: string, input: UserInput) {
  return `${name}.${getFileExtension(input)}`;
}
