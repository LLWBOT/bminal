import { spawn } from "child_process";

export function runCommand(input, cwd, onData, onError, onClose) {
  const [cmd, ...args] = input.split(" ");

  const proc = spawn(cmd, args, { cwd, shell: true });

  proc.stdout.on("data", (data) => onData(data.toString()));
  proc.stderr.on("data", (data) => onError(data.toString()));
  proc.on("close", (code) => onClose(code));

  return proc;
}
