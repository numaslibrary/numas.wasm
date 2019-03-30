let configuration = {
    genericTypes: ['i32', 'i64', 'u32', 'u64', 'f16', 'f32'],
}

const tokens = {
    start: '{{generate}}',
    end: '{{/generate}}',
    generic: /\{\{T\}\}/g,
}

const getConfig = () => configuration

const setConfig = config => configuration = config

const mapper = (type, data) => {
    return data.replace(tokens.generic, type)
}

const process = data => {
    let start = data.indexOf(tokens.start)
    let end = data.indexOf(tokens.end)
    let oldEnd = 0

    let result = []

    while (start !== -1 && end !== -1) {
        const generateText = data.substring(start + tokens.start.length, end)
        const generated = configuration.genericTypes.map(type => mapper(type, generateText))

        result.push(data.substring(oldEnd, start))
        result.push(...generated)

        oldEnd = end + tokens.end.length
        start = data.indexOf(tokens.start, start + tokens.start.length)
        end = data.indexOf(tokens.end, oldEnd)
    }

    if (result.length === 0) {
        result.push(data)   
    }

    return result.join('\n').replace(/\n{2,}/g, '\n')
}

module.exports = {
    process,
}