const fs = require('fs')
const path = require('path')

let processer = null
let out = null

const setOutput = output => {
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output)
    }

    out = output
}

const setProcesser = newProcesser => processer = newProcesser

const getProcesser = () => processer

const dispatch = (filename, dirname = null) => {
    fs.readFile(path.join(dirname, filename), 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            const res = processer.process(data)
            fs.writeFile(path.join(out, filename), res, error => {
                if (error) {
                    console.error(error)
                }
            })
        }
    })
}

const dispatchAll = dirname => {
    fs.readdir(dirname, (error, files) => {
        if (error) {
            console.error(error)
        } else {
            files.forEach(file => dispatch(file, dirname))
        }
    })
}

module.exports = {
    dispatch,
    dispatchAll,
    setProcesser,
    getProcesser,
    setOutput,
}