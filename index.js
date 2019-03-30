const d = require('./src/dispatcher')
const w = require('./src/processor')

d.setProcessor(w)
d.setOutput('./output')
d.dispatchAll('./templates')