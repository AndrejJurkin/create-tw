import { UserInput } from "./../cli/readInput";

export default function getTailwindConfigExtension(input: UserInput) {
  const { appType } = input;

  switch (appType) {
    case "NextJS":
      return "js";
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
      return "js";
  }
}
