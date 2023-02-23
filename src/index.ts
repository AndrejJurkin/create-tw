#!/usr/bin/env node
import inquirer from "inquirer";
import { readInput } from "./cli/readInput";
import getPackageManager from "./utils/getPackageManager";
import { logger } from "./utils/logger";
import chalk from "chalk";
import fs from "fs-extra";
import installTailwind from "./cli/output/installTailwind.js";
import installDependencies from "./cli/output/installDependencies.js";
import figlet from "figlet";
import createProject from "./cli/output/createProject.js";
import path from "path";
import { COMMON_TEMPLATES_ROOT } from "./constants";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

process.once("SIGINT", () => {
  process.exit(1);
});

async function main() {
  logger.info("\n");
  logger.higlight(
    figlet.textSync("create tw ", {
      font: "Mini",
    }),
  );

  logger.info(`\n${chalk.bold("Welcome to create-tw!")}`);
  logger.success("The easiest way to create a Tailwind project\n");

  const input = await readInput();
  const { projectDir, projectName } = input;
  const pkgManager = getPackageManager();

  logger.info(`\nUsing: ${chalk.cyan.bold(pkgManager)}\n`);

  if (fs.existsSync(projectDir)) {
    // Ask to overwrite
    const answer = await inquirer.prompt({
      name: "overwrite",
      type: "confirm",
      message: `${chalk.yellow.bold(`Directory already exists. Overwrite?`)}`,
    });

    if (!answer.overwrite) {
      logger.error("Aborting...");
      process.exit(1);
    }

    fs.removeSync(projectDir);
  }

  await createProject(input);

  // Add yarn.lock in project folder so the dependencies installation won't fail
  if (pkgManager === "yarn") {
    await fs.copy(
      path.join(COMMON_TEMPLATES_ROOT, "yarn.lock"),
      path.join(projectDir, "yarn.lock"),
    );
  }

  await installTailwind(input);

  const installDeps =
    process.env?.INSTALL_DEPENDENCIES === undefined ||
    process.env.INSTALL_DEPENDENCIES === "1"
      ? true
      : false;

  installDeps && (await installDependencies(input));

  logger.info(`\nProject created in ${chalk.green.bold(projectDir)}\n`);
  logger.info(`${chalk.cyan.bold(`cd ${projectName}`)}`);
  logger.info(
    `${chalk.cyan.bold(
      `${getPackageManager()} ${
        getPackageManager() === "npm" ? "run" : ""
      } dev`,
    )}\n`,
  );

  const repeatApplication =
    process.env?.REPEAT_APPLICATION === undefined ||
    process.env.REPEAT_APPLICATION === "1"
      ? true
      : false;

  if (!repeatApplication) {
    process.exit(0);
  }
  await main();
}

main().catch((e) => {
  logger.error(`\n${e}\n`);
  process.exit(1);
});
