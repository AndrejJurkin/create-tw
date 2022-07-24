import execAsync from "../../utils/execAsync.js";
import { UserInput } from "../readInput.js";

// Creates project using default create scripts like create-next-app or create-vite
export default async function createProject(input: UserInput) {
  const command = createInstallCommand(input);
  await execAsync(command);
}

function createInstallCommand(input: UserInput) {
  switch (input.appType) {
    case "NextJS":
      return createNextCommand(input);
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
      return createViteCommand(input);
    default:
      throw new Error(`Unknown app type: ${input.appType}`);
  }
}

function createViteCommand(input: UserInput) {
  const { appName, packageManager, appId } = input;

  const parts: string[] = [packageManager];

  if (packageManager === "npm") {
    parts.push("create vite@latest");
  } else {
    parts.push("create vite");
  }

  parts.push(appName);
  parts.push("--template", appId);
  return parts.join(" ");
}

function createNextCommand(input: UserInput) {
  const { appName, packageManager, language } = input;

  const parts: string[] = [packageManager];

  if (packageManager === "npm") {
    parts.push("create-next-app");
  } else {
    parts.push("create next-app");
  }

  parts.push(appName);

  if (language === "TypeScript") {
    if (packageManager === "npm" || packageManager === "pnpm") {
      parts.push("--ts");
    } else {
      parts.push("--typescript");
    }
  }

  return parts.join(" ");
}
