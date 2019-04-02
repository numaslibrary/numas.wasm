const d = require('./src/dispatcher')
const w = require('./src/processor')

const build = (input, output) => {
    d.setProcessor(w)
    d.setOutput(output)

    d.dispatchAll(input)
}

if (require.main === module) {
    build('./templates', './output')
}


module.exports = {
    build,
}
