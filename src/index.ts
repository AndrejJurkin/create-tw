import { readInput } from "./cli/readInput";
import createProject from "./output/createProject";
import getPackageManager from "./utils/getPackageManager";
import { logger } from "./utils/logger";
import chalk from "chalk";
import path from "path";
import ora from "ora";
import fs from "fs-extra";
import installTailwind from "./output/installTailwind.js";

async function main() {
  logger.info("Welcome to create-tailwind-app!");

  const input = await readInput();
  const pkgManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), input.appName);

  logger.info(`\nUsing: ${chalk.cyan.bold(pkgManager)}\n`);

  // Copy the template to the project directory
  const spinner = ora(`Scaffolding project in ${projectDir}`).start();
  // TODO: Check if exists and ask to overwrite
  // Ask to overwrite if exists
  if (fs.existsSync(projectDir)) {
    fs.removeSync(projectDir);
  }

  await createProject(input);

  spinner.succeed(
    `Finished scaffolding ${chalk.green.bold(input.appName)} project base.`,
  );

  await installTailwind(input, projectDir);

  // Get package.json
  const packageJson = await fs.readJSON(path.join(projectDir, "package.json"));
  console.log("packageJson", packageJson);

  process.exit(0);
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
