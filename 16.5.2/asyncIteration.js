async function grep(source, destination, pattern, encoding = "utf8") {
  source.setEncoding(encoding);

  destination.on("error", (err) => process.exit());
  let incompleteLine = "";
  for await (const chunk of source) {
    let lines = (incompleteLine + chunk).split("\n");
    incompleteLine = lines.pop();

    for (let line of lines) {
      if (pattern.test(line)) {
        destination.write(line + "\n", encoding);
      }
    }

    if (pattern.test(incompleteLine)) {
      destination.write(incompleteLine + "\n", encoding);
    }
  }
}

let pattern = new RegExp(process.argv[2]);
grep(process.stdin, process.stdout, pattern).catch((err) => {
  console.error("catch err:", err);
  process.exit();
});
