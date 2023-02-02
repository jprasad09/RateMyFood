const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authenticate = async(req, res, next) => {
    try{
        const token = req.cookies.token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({ _id: verifyToken._id, "tokens.token": token})

        if(!user){ throw new Error('User not found')}

        req.token = token
        req.user = user
        req.userId = user._id

        next()

    }catch(error){
        res.status(401).send('Unauthorized: No token provided')
    }
}

module.exports = authenticate