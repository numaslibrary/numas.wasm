const fs = require('fs')
const path = require('path')

let processor = null
let out = null

const setOutput = output => {
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output)
    }

    out = output
}

const setProcessor = newProcessor => processor = newProcessor

const getProcessor = () => processor

const dispatch = (filename, dirname = null) => {
    fs.readFile(path.join(dirname, filename), 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            const res = processor.process(data)

            fs.writeFile(path.join(out, `${path.parse(filename).name}.rs`), res, error => {
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
            files.filter(file => path.parse(file).ext === '.trs')
                 .forEach(file => dispatch(file, dirname))
        }
    })
}

module.exports = {
    dispatch,
    dispatchAll,
    setProcessor,
    getProcessor,
    setOutput,
}