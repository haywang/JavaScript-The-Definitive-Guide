console.log("Hello World!");
console.warn("Hello World!");
console.error("Hello World!");

console.log(process.argv);

process.setUncaughtExceptionCaptureCallback((err) => {
  console.error("Uncaught Exception:", err);
});

throw new Error("throw a error");
