const threads = require("worker_threads");

if (threads.isMainThread) {
  module.exports = function reticulateSplines(splines) {
    return new Promise((resolve, reject) => {
      let worker = new threads.Worker(__filename);
      worker.postMessage(splines);
      worker.on("message", resolve);
      worker.on("error", reject);
    });
  };
} else {
  threads.parentPort.once("message", (splines) => {
    for (let spline of splines) {
      spline.reticulate ? spline.reticulate() : (spline.reticulated = true);
    }
  });

  threads.parentPort.postMessage(splines);
}
