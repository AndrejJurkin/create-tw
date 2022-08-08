import path from "node:path";
import type { SyncOptions } from "execa";
import { execaCommandSync } from "execa";
import { remove } from "fs-extra";
import { afterEach, beforeAll, expect, test } from "vitest";
import { fileURLToPath } from "url";

// run `yarn build` before running any test
execaCommandSync("yarn build");

// replacement for default nodejs __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLI_PATH = path.join(__dirname, "..", "dist", "index.js");

const projectName = "test-app";
const genPath = path.join(__dirname, projectName);

function run(args: string[], options: SyncOptions<string> = {}) {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(" ")}`);
}

beforeAll(() => remove(genPath));
afterEach(() => remove(genPath));

test("prompts for the project name if none supplied i.e. yarn crete tw", () => {
  const { stdout } = run([]);

  expect(stdout).toContain("Project name");
});

test("prompts for the framework if project name supplied i.e. yarn create tw <project-name>", () => {
  const { stdout } = run([projectName]);

  expect(stdout).not.toContain("Project name");
  expect(stdout).toContain("App type");
});

test("show supported templates if --template <unknown> is passed", () => {
  const { stdout } = run([projectName, "--template", "unknown"]);

  expect(stdout).toContain("Unknown template: unknown");
  expect(stdout).toContain("Currently supported templates:");
});
