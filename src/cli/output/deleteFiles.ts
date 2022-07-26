import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { UserInput } from "./../readInput";

/**
 * Delete unneeded files from the scaffolded project
 *
 * @param UserInput CLI input
 * @param projectDir Path to the project directory
 */
export async function deleteFiles({ appId }: UserInput, projectDir: string) {
  const spinner = ora(`Deleting unneeded files`).start();

  switch (appId) {
    case "nextjs":
    // Fallthrough
    case "nextjs-ts":
      await fs.remove(path.join(projectDir, "styles/Home.module.css"));
      break;
    case "vanilla-ts":
      await fs.remove(path.join(projectDir, "src/counter.ts"));
      await fs.remove(path.join(projectDir, "src/typescript.svg"));
      break;
    default:
      break;
  }

  spinner.succeed("Deleted unneeded files");
}
