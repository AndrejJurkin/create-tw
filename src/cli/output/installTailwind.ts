import fs from "fs-extra";
import { UserInput } from "../readInput.js";
import ora from "ora";
import path from "path";
import { COMMON_TEMPLATES_ROOT } from "../../constants.js";
import getFileName from "../../utils/getFileName.js";
import { getTailwindTemplateDir } from "../../utils/getTailwindTemplateDir.js";
import copyTailwindTemplate from "./copyTailwindTemplate.js";
import addPluginsTransformer from "./addPluginsTransformer.js";
import { deleteFiles } from "./deleteFiles.js";

/**
 * Install all Tailwind dependencies and create Tailwind config files.
 *
 * @param input CLI input
 * @param projectDir Path to the project directory
 */
export default async function installTailwind(
  input: UserInput,
  projectDir: string,
) {
  await createTailwindConfig(input, projectDir);
  await createPostCssConfig(input, projectDir);
  await copyTailwindDirectives(input, projectDir);
  await copyTailwindTemplate(input, projectDir);
  await deleteFiles(input, projectDir);
}

async function createTailwindConfig(input: UserInput, projectDir: string) {
  const fileName = getFileName("tailwind.config", input);
  const tailwindTemplateDir = getTailwindTemplateDir(input);
  const tailwindConfig = path.join(tailwindTemplateDir, "tailwind.config.js");
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

async function createPostCssConfig(input: UserInput, projectDir: string) {
  const fileName = getFileName("postcss.config", input);
  const tailwindTemplateDir = getTailwindTemplateDir(input);
  const postCssConfig = path.join(tailwindTemplateDir, "postcss.config.js");
  const spinner = ora(`Creating ${fileName}`).start();

  await fs.copy(postCssConfig, path.join(projectDir, fileName));

  spinner.succeed(`${fileName} created`);
}

async function copyTailwindDirectives(input: UserInput, projectDir: string) {
  const directives = path.join(COMMON_TEMPLATES_ROOT, "directives.css");

  const spinner = ora(`Copying Tailwind directives`).start();
  await fs.copy(directives, getCssOutputPath(input, projectDir));
  spinner.succeed(`Added Tailwind directives`);
}

function getCssOutputPath({ appId }: UserInput, projectDir: string) {
  switch (appId) {
    case "nextjs":
    // Fall through:
    case "nextjs-ts":
      return path.join(projectDir, "styles", "globals.css");
    case "vanilla":
      return path.join(projectDir, "style.css");
    case "vanilla-ts":
    // Fall through
    default:
      return path.join(projectDir, "src", "style.css");
  }
}
