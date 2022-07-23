import { UserInput } from "./../cli/readInput";

export default function getFileExtension(input: UserInput) {
  const { appType, language } = input;

  const defaultExtension = language === "TypeScript" ? "ts" : "js";

  switch (appType) {
    case "NextJS":
      return defaultExtension;
    case "Vite":
    // Fall through
    case "Vanilla":
    // Fall through
    case "React":
    // Fall through
    case "Vue":
    // Fall thruogh
    case "Preact":
    // Fall through
    case "Svelte":
      return "cjs";
    default:
      return defaultExtension;
  }
}
