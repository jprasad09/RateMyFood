const jwt = require('jsonwebtoken')
const Restaurant = require('../models/restaurantModel')

const authenticateRes = async(req, res, next) => {
    try{
        //const token = req.cookies.token
        const token = req.headers.authorization.split(' ')[1]
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const restaurant = await Restaurant.findOne({ _id: verifyToken._id, "tokens.token": token})

        if(!restaurant){ throw new Error('Restaurant not found')}

        req.token = token
        req.restaurant = restaurant
        req.restaurantId = restaurant._id

        next()

    }catch(error){
        res.status(401).send('Unauthorized: No token provided')
    }
}

module.exports = authenticateRes