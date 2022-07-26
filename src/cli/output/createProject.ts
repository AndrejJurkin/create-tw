import { logger } from "./../../utils/logger";
import { PackageManager } from "./../../utils/getPackageManager";
import { UserInput } from "../readInput.js";
import { spawn } from "child_process";
import chalk from "chalk";

/**
 * Create and execute the command to install the project.
 *
 * @param input CLI input
 */
export default async function createProject(input: UserInput) {
  const command = createInstallCommand(input);

  const child = spawn(command, {
    stdio: "inherit",
    shell: true,
  });

  await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code) => {
      resolve(code);
    });
  });

  logger.log(
    `${chalk.bold.green("✔")} Project created using ${chalk.green.bold(
      getScaffoldingToolName(input),
    )}\n`,
  );
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

function getScaffoldingToolName(input: UserInput) {
  switch (input.appType) {
    case "NextJS":
      return "next-app";
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
      return "vite";
    default:
      throw new Error(`Unknown app type: ${input.appType}`);
  }
}

function createViteCommand(input: UserInput) {
  const { appName, packageManager, appId } = input;

  const parts: string[] = [resolvePacakgeManager(packageManager)];

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

  // npx --yes is to automatically accept the prompt to install latest version
  const parts: string[] = [resolvePacakgeManager(packageManager)];

  if (packageManager === "npm") {
    parts.push("create-next-app@latest");
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

// We use npx to install the latest version of scaffolding tools
// The --yes is to automatically accept latest version prompt
function resolvePacakgeManager(packageManager: PackageManager) {
  return packageManager === "npm" ? "npx --yes" : packageManager;
}
