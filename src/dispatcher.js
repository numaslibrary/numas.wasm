const fs = require('fs')
const path = require('path')

let wrapper = null
let out = null

const setOutput = output => {
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output)
    }

    out = output
}

const setWrapper = newWrapper => wrapper = newWrapper

const getWrapper = () => wrapper

const dispatch = (filename, dirname = null) => {
    fs.readFile(path.join(dirname, filename), 'utf8', (_, data) => {
        const res = wrapper.process(data)
        fs.writeFile(path.join(out, filename), res, error => {
            if (error) {
                console.error(error)
            }
        })
    })
}

const dispatchAll = dirname => {
    fs.readdir(dirname, (_, files) => {
        files.forEach(file => dispatch(file, dirname))
    })
}

module.exports = {
    dispatch,
    dispatchAll,
    setWrapper,
    getWrapper,
    setOutput,
}