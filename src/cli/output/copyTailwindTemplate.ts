import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { UserInput } from "../readInput.js";
import { getTailwindTemplateDir } from "../../utils/getTailwindTemplateDir.js";

export default async function copyTailwindTemplate(
  input: UserInput,
  projectDir: string,
) {
  const { appId } = input;
  const tailwindTemplateDir = getTailwindTemplateDir(input);

  const spinner = ora(`Copying Tailwind template`).start();

  switch (appId) {
    case "vanilla":
      await copyVanilla(tailwindTemplateDir, projectDir);
      break;
    case "vanilla-ts":
      await copyVanillaTs(tailwindTemplateDir, projectDir);
      break;
    default:
      throw new Error(
        `Unknown app type for tailwind template output: ${appId}`,
      );
  }

  spinner.succeed(`Copied Tailwind template (${chalk.cyan(appId)})`);
}

async function copyVanilla(templateDir: string, projectDir: string) {
  await fs.copy(
    path.join(templateDir, "index.html"),
    path.join(projectDir, "index.html"),
  );
  await fs.copy(
    path.join(templateDir, "main.js"),
    path.join(projectDir, "main.js"),
  );
}

async function copyVanillaTs(templateDir: string, projectDir: string) {
  await fs.copy(
    path.join(templateDir, "index.html"),
    path.join(projectDir, "index.html"),
  );
  await fs.copy(
    path.join(templateDir, "main.ts"),
    path.join(projectDir, "src/main.ts"),
  );
}
