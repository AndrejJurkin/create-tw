import { logger } from "./../utils/logger";
import getPackageManager, {
  PackageManager,
} from "./../utils/getPackageManager";
import inquirer from "inquirer";
import { Command } from "commander";
import { getVersion } from "../utils/getVersion";
import validateAppName from "../utils/validateAppName.js";
import chalk from "chalk";

// TODO: Move to constants
const APP_NAME = "create-tailwind-app";

interface Flags {
  initGit: boolean;
  installDependencies: boolean;
}

export const supportedDependencies = ["prettier", "clsx"];

export const supportedPlugins = [
  "@tailwindcss/typography",
  "@tailwindcss/forms",
  "@tailwindcss/aspect-ratio",
];

export const supportedAppTypes = [
  "NextJS",
  "Vanilla",
  // "React",
  // "Vue",
  // "Svelte",
];

export const supportedAppIds = ["nextjs", "nextjs-ts", "vanilla", "vanilla-ts"];

export type Dependencies = typeof supportedDependencies[number];
export type Plugins = typeof supportedPlugins[number];
export type AppType = typeof supportedAppTypes[number];
export type Language = "TypeScript" | "JavaScript";
export type AppId = typeof supportedAppIds[number];

export interface UserInput {
  appName: string;
  appType: AppType;
  appId: AppId;
  options: Flags;
  language: Language;
  dependencies: Dependencies[];
  plugins: Plugins[];
  packageManager: PackageManager;
}

const defaults: UserInput = {
  appName: "tailwind-app",
  appType: "nextjs",
  appId: "nextjs",
  options: {
    initGit: false,
    installDependencies: false,
  },
  language: "TypeScript",
  plugins: [] as Plugins[],
  dependencies: [] as Dependencies[],
  packageManager: getPackageManager(),
};

export async function readInput() {
  const input = { ...defaults };
  const program = new Command().name(APP_NAME);

  program
    .description(
      "A CLI for quickly creating applications based on Tailwind CSS",
    )
    .argument("[app]", "The name of the application")
    .option("--template <template>", "The template to use")
    .version(getVersion())
    .parse(process.argv);

  const template = program.opts().template;
  const templateSupported = supportedAppIds.includes(template);

  if (!templateSupported) {
    logger.error(`Unknown template: ${template}\n`);
    logger.info(
      `Currently supported templates:\n${chalk.green(
        supportedAppIds.join("\n"),
      )}`,
    );
    logger.info(
      `You can skip passing the template and select it interactively.\n`,
    );

    const answer = await inquirer.prompt({
      name: "continue",
      type: "confirm",
      message: "Would you like to continue with interactive mode?",
    });

    if (!answer.continue) {
      process.exit(1);
    }
  }

  input.appName = program.args[0] ?? (await readAppName());
  if (templateSupported) {
    const parsedTemplate = template.split("-");

    const appType = supportedAppTypes.find(
      (t) => t.toLowerCase() === parsedTemplate[0],
    );

    if (!appType) {
      throw new Error(`Unknown app type: ${parsedTemplate[0]}`);
    }

    input.appType = appType;
    input.appId = template;
    input.language = template.includes("ts") ? "TypeScript" : "JavaScript";
  } else {
    input.language = await readLanguage();
    input.appType = await readAppType(supportedAppTypes);
    input.appId = `${input.appType.toLocaleLowerCase()}${
      input.language === "TypeScript" ? "-ts" : ""
    }`;
  }

  input.dependencies = await readDependencies(supportedDependencies);
  input.plugins = await readPlugins(supportedPlugins);

  return input;
}

async function readAppName() {
  const { appName } = await inquirer.prompt<Pick<UserInput, "appName">>({
    name: "appName",
    type: "input",
    message: "What will your project be called?",
    default: defaults.appName,
    validate: validateAppName,
    transformer: (i: string) => {
      return i.trim();
    },
  });

  return appName;
}

async function readAppType(types: AppType[]) {
  const { appType } = await inquirer.prompt<{
    appType: AppType;
  }>({
    name: "appType",
    type: "list",
    message: "What type of application will you be creating?",
    choices: types.map((t) => ({
      name: t,
      value: t,
    })),
    default: "typescript",
  });

  return appType;
}

async function readDependencies(choices: string[]) {
  const { dependencies } = await inquirer.prompt<
    Pick<UserInput, "dependencies">
  >({
    name: "dependencies",
    type: "checkbox",
    message: "Which dependencies would you like to include?",
    choices: choices.map((dependency) => ({
      name: dependency,
      checked: false,
    })),
  });

  return dependencies;
}

async function readLanguage() {
  const { language } = await inquirer.prompt<{ language: Language }>({
    name: "language",
    type: "list",
    message: "What language will your project be written in?",
    choices: [
      { name: "TypeScript", value: "TypeScript", short: "TypeScript" },
      { name: "JavaScript", value: "JavaScript", short: "JavaScript" },
    ],
    default: "typescript",
  });

  return language;
}

async function readPlugins(choices: string[]) {
  const { plugins } = await inquirer.prompt<Pick<UserInput, "plugins">>({
    name: "plugins",
    type: "checkbox",
    message: "Which plugins would you like to include?",
    choices: choices.map((dependency) => ({
      name: dependency,
      checked: false,
    })),
  });

  return plugins;
}
