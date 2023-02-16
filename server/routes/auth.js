const express = require('express')
const User = require('../models/userModel')
const Restaurant = require('../models/restaurantModel')
const bcrypt = require('bcryptjs')
const authenticate = require('../middlewares/authenticate')

const router = express.Router()

router.post('/signin', async (req,res) => {
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
                              
                if(!isMatch){
                    res.status(400).json({ error : "Invalid credentials" })
                }else{
                    res.status(200).json({ message : "Signin successful", token, account: userLogin })
                }
            }else{
                const isMatch = await bcrypt.compare(password, restaurantLogin.password)

                const token = await restaurantLogin.generateAuthToken()
              
                if(!isMatch){
                    res.status(400).json({ error : "Invalid credentials" })
                }else{
                    res.status(200).json({ message : "Signin successful", token, account: restaurantLogin })
                }
            }
        }

    }catch(error){
        res.status(400).json({ error: error.message })
    }

})

router.get('/review', authenticate, (req,res) => {
    res.send(req.user)
})

router.get('/restaurant', authenticate, (req,res) => {
    res.send(req.user)
})

router.get('/', authenticate, (req,res) => {
    res.send(req.user)
})

module.exports = router