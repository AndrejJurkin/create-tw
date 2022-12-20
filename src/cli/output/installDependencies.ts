import { Dependency, UserInput } from "./../config";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { COMMON_TEMPLATES_ROOT } from "../../constants.js";
import getPackageManager from "../../utils/getPackageManager.js";
import installPackages from "../../utils/installPackages.js";

/**
 * Install dependencies for the project.
 *
 * @param input CLI input
 * @param projectDir Path to the project directory
 */
export default async function installDependencies(input: UserInput) {
  const { plugins, projectDir, appConfig } = input;

  const devDependencies = input.dependencies
    .filter(filterDevDependency)
    .map(mapPackage);

  const appConfigDevDependencies =
    appConfig.dependencies?.filter(filterDevDependency).map(mapPackage) ?? [];

  // TODO: Add support for appConfig.dependencies
  const dependencies = input.dependencies
    .filter(filterProdDependency)
    .map(mapPackage);

  const twDependencies =
    input.appConfig.twDependencies?.map((d) => d.package) ?? [];

  const twPlugins = plugins.map((p) => p.package);

  const devPackages = [
    "tailwindcss",
    "postcss",
    "autoprefixer",
    ...devDependencies,
    ...twDependencies,
    ...twPlugins,
    ...appConfigDevDependencies,
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

const filterDevDependency = (d: Dependency) => d.type === "dev";

const filterProdDependency = (d: Dependency) => d.type === "prod";

const mapPackage = (d: Dependency) => d.package;
