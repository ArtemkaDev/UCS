let initialized = {
    "discord": []
}

async function ready(module, func, state) {
    initialized[module].push(`${func} ${state ? "success" : "error"}`)
}

module.exports = { ready, initialized }