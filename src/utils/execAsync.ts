import { exec } from "child_process";
import { promisify } from "util";

const execa = promisify(exec);

export default execa;
