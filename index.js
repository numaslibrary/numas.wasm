const d = require('./src/dispatcher')
const w = require('./src/processer')

d.setProcesser(w)
d.setOutput('./output')
d.dispatchAll('./templates')