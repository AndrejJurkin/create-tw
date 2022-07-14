import { readInput } from "./cli/readInput";
import { logger } from "./utils/logger";

async function main() {
  logger.info("Welcome to create-tailwind-app!");

  const input = await readInput();
  logger.success(`User input: ${JSON.stringify(input, null, 2)}`);

  process.exit(0);
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
