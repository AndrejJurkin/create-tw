import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { COMMON_TEMPLATES_ROOT } from "../../constants.js";
import getPackageManager from "../../utils/getPackageManager.js";
import installPackages from "../../utils/installPackages.js";
import { UserInput } from "../config.js";

/**
 * Install dependencies for the project.
 *
 * @param input CLI input
 * @param projectDir Path to the project directory
 */
export default async function installDependencies(input: UserInput) {
  const { plugins, projectDir } = input;

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

  const spinner = ora(`Installing dependencies`).start();
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
  spinner.succeed(`Dependencies installed`);

  // If prettier is in dependencies create prettier config and prettier ignore files
  if (devDependencies.includes("prettier")) {
    const rc = path.join(COMMON_TEMPLATES_ROOT, ".prettierrc");
    const ignore = path.join(COMMON_TEMPLATES_ROOT, ".prettierignore");

    spinner.start(`Creating .prettierrc and .prettierignore`).start();
    await fs.copy(rc, path.join(projectDir, ".prettierrc"));
    await fs.copy(ignore, path.join(projectDir, ".prettierignore"));
    spinner.succeed(`.prettierrc and .prettierignore created`);
  }
}

const dependenciesMap: Record<string, "dev" | "dependencies"> = {
  prettier: "dev",
  clsx: "dependencies",
};
