const jwt = require('jsonwebtoken')

let key = "caffeine"

const generateToken = (payload) => {
    const verifyOpts = {
    
    }
    const token = jwt.sign(payload,key,verifyOpts)
    return token
}

module.exports = {generateToken}