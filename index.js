const d = require('./src/dispatcher')
const w = require('./src/wrapper')

d.setWrapper(w)
d.setOutput('./output')
d.dispatchAll('./templates')