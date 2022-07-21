import fs from "fs-extra";
import { UserInput } from "../cli/readInput.js";
import ora from "ora";
import path from "path";
import installPackages from "../utils/installPackages.js";
import getPackageManager from "../utils/getPackageManager.js";
import { PKG_ROOT } from "../constants.js";

export default async function installTailwind(
  input: UserInput,
  projectDir: string,
) {
  await installDependencies(input, projectDir);
  await createTailwindConfig(input, projectDir);
  await createPostCssConfig(input, projectDir);
  await copyTailwindDirectives(projectDir);
}

async function installDependencies(input: UserInput, projectDir: string) {
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
}

async function createTailwindConfig(input: UserInput, projectDir: string) {
  const tailwindTemplateDir = getTailwindTemplateDir(input);
  const tailwindConfig = path.join(tailwindTemplateDir, "tailwind.config.js");

  const spinner = ora(`Creating tailwind.config.js`).start();
  await fs.copy(tailwindConfig, path.join(projectDir, "tailwind.config.js"));
  spinner.succeed(`tailwind.config.js created`);
}

async function createPostCssConfig(input: UserInput, projectDir: string) {
  const tailwindTemplateDir = getTailwindTemplateDir(input);
  const postCssConfig = path.join(tailwindTemplateDir, "postcss.config.js");

  const spinner = ora(`Creating postcss.config.js`).start();
  await fs.copy(postCssConfig, path.join(projectDir, "postcss.config.js"));
  spinner.succeed(`postcss.config.js created`);
}

async function copyTailwindDirectives(projectDir: string) {
  const directives = path.join(
    PKG_ROOT,
    "src",
    "templates",
    "tailwind",
    "common",
    "directives.css",
  );

  const spinner = ora(`Copying Tailwind directives`).start();
  await fs.copy(directives, path.join(projectDir, "tailwind.css"));
  spinner.succeed(`Finished copying Tailwind directives`);
}

function getTailwindTemplateDir({ appType }: UserInput) {
  return path.join(PKG_ROOT, "src", "templates", "tailwind", appType);
}
