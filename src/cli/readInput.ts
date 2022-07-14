import inquirer from "inquirer";
import { Command } from "commander";
import { getVersion } from "../utils/getVersion";
import validateAppName from "../utils/validateAppName";

// TODO: Move to constants
const APP_NAME = "create-tailwind-app";

interface Flags {
  initGit: boolean;
  installDependencies: boolean;
}

const supportedDependencies = ["prettier", "clsx"];

const supportedPlugins = [
  "@tailwindcss/ui",
  "@tailwindcss/typography",
  "@tailwindcss/forms",
  "@tailwindcss/aspect-ratio",
];

const supportedAppTypes = ["nextjs", "vanilla"];

type Dependencies = typeof supportedDependencies[number];
type Plugins = typeof supportedPlugins[number];
type AppType = typeof supportedAppTypes[number];

interface UserInput {
  appName: string;
  appType: AppType;
  options: Flags;
  language: "typescript" | "javascript";
  dependencies: Dependencies[];
  plugins: Plugins[];
}

const defaults: UserInput = {
  appName: "create-tailwind-app",
  appType: "nextjs",
  options: {
    initGit: false,
    installDependencies: false,
  },
  language: "typescript",
  plugins: [] as Plugins[],
  dependencies: [] as Dependencies[],
};

export async function readInput() {
  const input = { ...defaults };
  const program = new Command().name(APP_NAME);

  program
    .description(
      "A CLI for quickly creating applications based on Tailwind CSS",
    )
    .argument("[app]", "The name of the application")
    .option("--git", "Initialize a git repository", defaults.options.initGit)
    .option(
      "--deps",
      "Install dependencies",
      defaults.options.installDependencies,
    )
    .version(getVersion())
    .parse(process.argv);

  const appNameArg = program.args[0];

  if (!appNameArg) {
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

    input.appName = appName;
  }

  const { language } = await inquirer.prompt<{
    language: "javascript" | "typescript";
  }>({
    name: "language",
    type: "list",
    message: "What language will your project be written in?",
    choices: [
      { name: "TypeScript", value: "typescript", short: "typescript" },
      { name: "JavaScript", value: "javascript", short: "javascript" },
    ],
    default: "typescript",
  });

  input.language = language;

  const { appType } = await inquirer.prompt<{
    appType: AppType;
  }>({
    name: "appType",
    type: "list",
    message: "What type of application will you be creating?",
    choices: supportedAppTypes.map((t) => ({
      name: t,
      value: t,
    })),
    default: "typescript",
  });

  input.appType = appType;

  const { dependencies } = await inquirer.prompt<
    Pick<UserInput, "dependencies">
  >({
    name: "dependencies",
    type: "checkbox",
    message: "Which dependencies would you like to include?",
    choices: supportedDependencies.map((dependency) => ({
      name: dependency,
      checked: false,
    })),
  });

  input.dependencies = dependencies;

  const { plugins } = await inquirer.prompt<Pick<UserInput, "plugins">>({
    name: "plugins",
    type: "checkbox",
    message: "Which plugins would you like to include?",
    choices: supportedPlugins.map((dependency) => ({
      name: dependency,
      checked: false,
    })),
  });

  input.plugins = plugins;

  return input;
}
