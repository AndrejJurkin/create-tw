import { readInput } from "./cli/readInput";
import { logger } from "./utils/logger";

function main() {
  logger.info("Welcome to create-tailwind-app!");

  const input = readInput();
  logger.success(`User input: ${JSON.stringify(input, null, 2)}`);

  process.exit(0);
}

main();
