import execAsync from "../utils/execAsync.js";
import { logger } from "../utils/logger.js";
import { AppType, Language, UserInput } from "./../cli/readInput";

export default async function createProject(input: UserInput) {
  const command = createInstallCommand(input);
  logger.info("Running:", command);
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
      return createNextCommand(input);
  }
}

function createViteCommand(input: UserInput) {
  const { appName, packageManager, language } = input;

  const templates: Record<Language, any> = {
    JavaScript: {
      Vanilla: "vanilla",
      Vue: "vue",
      React: "react",
      Preact: "preact",
      Lit: "lit",
      Svelte: "svelte",
    },
    TypeScript: {
      Vanilla: "vanilla-ts",
      Vue: "vue-ts",
      React: "react-ts",
      Preact: "preact-ts",
      Lit: "lit-ts",
      Svelte: "svelte-ts",
    },
  };

  const parts: string[] = [packageManager];

  if (packageManager === "npm") {
    parts.push("create vite@latest");
  } else {
    parts.push("create vite");
  }

  parts.push(appName);
  parts.push("--template", templates[language][input.appType]);
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
