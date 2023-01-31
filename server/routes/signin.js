const express = require('express')
const User = require('../models/userModel')
const Restaurant = require('../models/restaurantModel')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/', async (req,res) => {
    try{
        const { email, password} = req.body

        if(!email || !password){
            return res.status(400).json({ error: 'Please fill in all fields' })
        }

        const userLogin = await User.findOne({ email: email })
        const restaurantLogin = await Restaurant.findOne({ email: email })

        if(!userLogin & !restaurantLogin){
            res.status(404).json({ error : "Not found" })
        }else{
            if(userLogin){
                const isMatch = await bcrypt.compare(password, userLogin.password)

                const token = await userLogin.generateAuthToken()
                res.cookie("token", token, {
                    expires: new Date(Date.now() + 864000000),
                    httpOnly: true
                })
                
                if(!isMatch){
                    res.status(400).json({ error : "Invalid credentials" })
                }else{
                    res.status(200).json({ message : "Signin successful" })
                }
            }else{
                const isMatch = await bcrypt.compare(password, restaurantLogin.password)

                const token = await restaurantLogin.generateAuthToken()
                res.cookie("token", token, {
                    expires: new Date(Date.now() + 864000000),
                    httpOnly: true
                })

                if(!isMatch){
                    res.status(400).json({ error : "Invalid credentials" })
                }else{
                    res.status(200).json({ message : "Signin successful" })
                }
            }
        }

    }catch(error){
        res.status(400).json({ error: error.message })
    }

})

module.exports = router
