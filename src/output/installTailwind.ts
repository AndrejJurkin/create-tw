import { UserInput } from "../cli/readInput.js";
import ora from "ora";
import installPackages from "../utils/installPackages.js";
import getPackageManager from "../utils/getPackageManager.js";

export default async function installTailwind(
  input: UserInput,
  projectDir: string,
) {
  const { plugins } = input;

  const packages = ["tailwindcss", "postcss", "autoprefixer", ...plugins];

  const spinner = ora(`Installing TailwindCSS dependencies`).start();
  await installPackages({
    dev: true,
    projectDir,
    packageManager: getPackageManager(),
    packages,
  });
  spinner.succeed(`Finished installing TailwindCSS dependencies`);

  spinner.start();
}
