const fs = require("fs")

function readConfigFile(path, callback) {
    fs.readFile(path, "utf-8", (err, text) => {
        if (err) {
            console.error("callback err:",err)
            callback(null)
            return
        }
        let data = null
        try {
            data = JSON.parse(text)
        } catch(e) {
            console.error("catch error:", e)
        }

        callback(data)
    })
}

readConfigFile("config.json", (data) => {
    console.log(data)
})

const util = require("util")
const pfs = {
    readFile: util.promisify(fs.readFile)
}

function readConfigFile2(path){
    return pfs.readFile(path, "utf-8").then(text => JSON.parse(text))
}

readConfigFile2("config.json").then(data => console.log(data)).catch(err => console.error(err))

async function readConfigFile3(path){
    let text = await pfs.readFile(path, "utf-8")
    return JSON.parse(text)
}

readConfigFile3('config.json').then(data => console.log(data)).catch(err => console.error(err))