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

const dispatch = (filename, dirname = null, top = null) => {
    fs.readFile(path.join(dirname, filename), 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            const res = processor.process(data)

            fs.writeFile(path.join(out, top, `${path.parse(filename).name}.rs`), res, error => {
                if (error) {
                    console.error(error)
                }
            })
        }
    })
}

const dispatchAll = (dirname, top = '') => {
    fs.readdir(dirname, (error, files) => {
        if (error) {
            console.error(error)
        } else {
            files.forEach(file => {
                let fullname = path.join(dirname, file)
                let stats = fs.statSync(fullname)

                if (stats.isDirectory()) {
                    let directory = path.join(out, top, file) 
                    
                    if (!fs.existsSync(directory)) {
                        fs.mkdirSync(directory)
                    }

                    dispatchAll(fullname, path.join(top, file))
                } else if (stats.isFile() && path.parse(file).ext === '.trs') {
                    dispatch(file, dirname, top)      
                }
            })
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