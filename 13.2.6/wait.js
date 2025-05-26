function wait(duration) {
  return new Promise((resolve, reject) => {
    if (duration < 0) {
      reject(new Error("Time travel not yet implemented"));
    }
    setTimeout(resolve, duration);
  });
}

wait(1000).then(() => console.log("You'll see this after 1 second"));
