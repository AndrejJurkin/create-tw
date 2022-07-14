import { Command } from "commander";
import { getVersion } from "../utils/getVersion";
import readAppName from "./inputs/readAppName";
import readLanguage from "./inputs/readLanguage";
import readAppType from "./inputs/readAppType";
import readDependencies from "./inputs/readDependencies";
import readPlugins from "./inputs/readPlugins";

// TODO: Move to constants
const APP_NAME = "create-tailwind-app";

interface Flags {
  initGit: boolean;
  installDependencies: boolean;
}

export const supportedDependencies = ["prettier", "clsx"];

export const supportedPlugins = [
  "@tailwindcss/ui",
  "@tailwindcss/typography",
  "@tailwindcss/forms",
  "@tailwindcss/aspect-ratio",
];

export const supportedAppTypes = [
  "NextJS",
  "Vanilla",
  "React (Vite)",
  "Vue",
  "Svelte",
];

export type Dependencies = typeof supportedDependencies[number];
export type Plugins = typeof supportedPlugins[number];
export type AppType = typeof supportedAppTypes[number];
export type Language = "TypeScript" | "JavaScript";

export interface UserInput {
  appName: string;
  appType: AppType;
  options: Flags;
  language: Language;
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
  language: "TypeScript",
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
    input.appName = await readAppName(defaults);
  }

  input.language = await readLanguage();
  input.appType = await readAppType(supportedAppTypes);
  input.dependencies = await readDependencies(supportedDependencies);
  input.plugins = await readPlugins(supportedPlugins);

  return input;
}
