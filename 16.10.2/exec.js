const child_process = require("child_process");
const util = require("util");
const execP = util.promisify(child_process.exec);

function parallelExec(commands) {
  let promises = commands.map((command) =>
    execP(command, { encoding: "utf8" })
  );

  return Promise.all(promises).then((outputs) => {
    return outputs.map((output) => output.stdout);
  });
}

parallelExec(["ls -l", "pwd", "date"]).then((outputs) => {
  console.log(outputs);
});
