import { logger } from "./../../utils/logger";
import { spawn } from "child_process";
import chalk from "chalk";
import { UserInput } from "../config.js";

/**
 * Create and execute the command to install the project.
 *
 * @param input CLI input
 */
export default async function createProject(input: UserInput) {
  const { appConfig } = input;
  const command = appConfig.createInstallCommand(input);

  logger.info(`\nInstalling project using ${chalk.green(command)}\n`);

  const child = spawn(command, {
    stdio: "inherit",
    shell: true,
  });

  await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code) => {
      resolve(code);
    });
  });

  logger.log(
    `${chalk.bold.green("✔")} Project created using ${chalk.green.bold(
      appConfig.scaffoldingTool,
    )}`,
  );
}
