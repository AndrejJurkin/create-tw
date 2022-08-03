import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { COMMON_TEMPLATES_ROOT } from "../../constants.js";
import addPluginsTransformer from "./addPluginsTransformer.js";
import { UserInput } from "../config.js";

/**
 * Install all Tailwind dependencies, create config files and copy templates.
 *
 * @param input CLI input
 */
export default async function installTailwind(input: UserInput) {
  if (input.appConfig.skipTailwindInstall) {
    return;
  }

  await createTailwindConfig(input);
  await createPostCssConfig(input);
  await copyTailwindDirectives(input);
  await copyTailwindTemplate(input);
  await deleteFiles(input);
}

async function createTailwindConfig(input: UserInput) {
  const { appConfig, projectDir } = input;
  const { templateDir } = appConfig;

  const fileName = getConfigFileName("tailwind.config", input);
  const tailwindConfig = path.join(templateDir, "tailwind.config.js");
  const spinner = ora(`Creating ${fileName}`).start();

  await fs.copy(tailwindConfig, path.join(projectDir, fileName));

  // Parse tailwind.config.js
  const tailwindConfigSource = await fs.readFile(
    path.join(projectDir, fileName),
  );
  const transformer = addPluginsTransformer(input.plugins);
  const transformed = transformer(tailwindConfigSource);

  await fs.writeFile(path.join(projectDir, fileName), transformed);

  spinner.succeed(`${fileName} created`);
}

async function createPostCssConfig(input: UserInput) {
  const { appConfig, projectDir } = input;
  const { templateDir } = appConfig;
  const fileName = getConfigFileName("postcss.config", input);
  const postCssConfig = path.join(templateDir, "postcss.config.js");
  const spinner = ora(`Creating ${fileName}`).start();

  await fs.copy(postCssConfig, path.join(projectDir, fileName));
  spinner.succeed(`${fileName} created`);
}

async function copyTailwindDirectives(input: UserInput) {
  const { appConfig } = input;
  const directives = path.join(COMMON_TEMPLATES_ROOT, "directives.css");
  const spinner = ora(`Copying Tailwind directives`).start();

  await fs.copy(directives, appConfig.getCssOutputPath(input));
  spinner.succeed(`Added Tailwind directives`);
}

async function copyTailwindTemplate(input: UserInput) {
  const { appConfig } = input;
  const spinner = ora(`Copying Tailwind template`).start();

  await appConfig.copyTemplate(input);
  spinner.succeed(`Added Tailwind template`);
}

async function deleteFiles(input: UserInput) {
  const spinner = ora(`Deleting unneeded files`).start();

  await input.appConfig.deleteFiles?.(input);
  spinner.succeed("Deleted unneeded files");
}

function getConfigFileName(fileName: string, input: UserInput) {
  return `${fileName}${input.appConfig.twConfigExtension}`;
}
