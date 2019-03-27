let configuration = {
    genericTypes: ['i32', 'i64', 'u32', 'u64', 'f16', 'f32'],
    structTypes: [],
}

const getConfig = () => configuration

const setConfig = config => configuration = config

const mapper = (type, data) => data.replace(/\{\{T\}\}/g, type)

const process = data => {
    const res = configuration.genericTypes
                             .map(type => mapper(type, data))
                             .join('\n\n')
    return res
}

module.exports = {
    process,
}