import { readInput } from "./cli/readInput";
import createProject from "./output/createProject";
import getPackageManager from "./utils/getPackageManager";
import { logger } from "./utils/logger";
import chalk from "chalk";
import path from "path";
import ora from "ora";
import fs from "fs-extra";
import getTemplateDir from "./utils/getTemplateDir.js";

const wait = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds);
  });
};

async function main() {
  logger.info("Welcome to create-tailwind-app!");

  const input = await readInput();
  const pkgManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), input.appName);
  const templateDir = getTemplateDir(input);

  logger.info(`\nUsing: ${chalk.cyan.bold(pkgManager)}\n`);

  const spinner = ora(`Scaffolding project in ${projectDir}`).start();

  await fs.copy(templateDir, projectDir);

  spinner.succeed(
    `Finished scaffolding ${chalk.green.bold(input.appName)} project base.`,
  );

  // createProject(input);

  process.exit(0);
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
