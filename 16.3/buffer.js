let b = Buffer.from([0x41, 0x42, 0x43])
console.log(b.toString())
console.log(b.toString("hex"))

let computer = Buffer.from("IBM3111", "ascii")
for(let i=0; i < computer.length; i++){
    computer[i]--
}
console.log(computer.toString("ascii"))
console.log(computer.subarray(0, 3).map(x => x+1).toString())


let zeros = Buffer.alloc(1024)
let ones = Buffer.alloc(128, 1)
let dead = Buffer.alloc(1024, "DEADBEEF", "hex")

console.log(dead.readUInt32BE(0).toString(16))
console.log(dead.readUInt32BE(1).toString(16))
console.log(dead.readBigUInt64BE(6).toString(16))
console.log(dead.readUInt32LE(1020).toString(16))