const User = require('../models/User.js')
const createToken = require('../utils/tokenHelper.js')


async function register(userData){
  

    const existing = await User.findOne({email : userData.email})
    if(existing){
        throw new Error('A user with this email already exists')
    }

    const createdUser = await User.create(userData)
    const token = await createToken(createdUser)

    return token
}


module.exports = {
    register,
}