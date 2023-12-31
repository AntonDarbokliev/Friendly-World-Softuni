const jwt = require('./jwt.js')
const SECRET_KEY = require('../config/secretKey.js')

async function createToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = await jwt.sign(payload,SECRET_KEY)

    return token
}

module.exports = createToken