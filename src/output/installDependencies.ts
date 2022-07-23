import ora from "ora";
import { UserInput } from "../cli/readInput.js";
import getPackageManager from "../utils/getPackageManager.js";
import installPackages from "../utils/installPackages.js";

export default async function installDependencies(
  input: UserInput,
  projectDir: string,
) {
  const { plugins } = input;

  const devDependencies = input.dependencies.filter(
    (d) => dependenciesMap[d] === "dev",
  );
  const dependencies = input.dependencies.filter(
    (d) => dependenciesMap[d] === "dependencies",
  );

  const devPackages = [
    "tailwindcss",
    "postcss",
    "autoprefixer",
    ...plugins,
    ...devDependencies,
  ];

  const spinner = ora(`Installing TailwindCSS dependencies`).start();
  await installPackages({
    dev: true,
    projectDir,
    packageManager: getPackageManager(),
    packages: devPackages,
  });
  await installPackages({
    dev: false,
    projectDir,
    packageManager: getPackageManager(),
    packages: dependencies,
  });
  spinner.succeed(`Finished installing TailwindCSS dependencies`);
}

const dependenciesMap: Record<string, "dev" | "dependencies"> = {
  prettier: "dev",
  clsx: "dependencies",
};
