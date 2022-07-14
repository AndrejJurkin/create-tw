import { Command } from "commander";
import { getVersion } from "../utils/getVersion";

// TODO: Move to constants
const APP_NAME = "create-tailwind-app";

type AppType = "nextjs" | "vanilla";

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

type Dependencies = typeof supportedDependencies[number];
type Plugins = typeof supportedPlugins[number];

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

export function readInput() {
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
  console.log(JSON.stringify(program.args, null, 2));
  input.appName = program.args[0] ?? defaults.appName;
  input.options = program.opts();

  return input;
}
