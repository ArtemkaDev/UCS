const jwt = require("jwt")
const jwt_decode = require("jwt-decode")

async function decode(token, key){
    const secret = key || process.env.DEFAULT_TOKEN
    return jwt_decode(secret)
}