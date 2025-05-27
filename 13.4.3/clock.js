function elapsedTime(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function* clock(interval, max = Infinity) {
  for (let count = 1; count < max; count++) {
    await elapsedTime(interval);
    yield count;
  }
}

async function test() {
  for await (let tick of clock(1000, 100)) {
    console.log(tick);
  }
}

test();
