// setTimeout(() => { console.log("Ready...")}, 1000)
// setTimeout(() => { console.log("set...")}, 2000)
// setTimeout(() => { console.log("go!!")}, 3000)
console.clear();
console.log(new Date().toLocaleTimeString());
let clock = setInterval(() => {
    console.clear();
    console.log(new Date().toLocaleTimeString());
}, 1000);

setTimeout(() => {
    console.clear();
    console.log(new Date().toLocaleTimeString());
    console.log("clock = ", clock)
    clearInterval(clock);
}, 10000)