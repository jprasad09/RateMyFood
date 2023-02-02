require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user')
const restaurantRoutes = require('./routes/restaurant')
const reviewRoutes = require('./routes/review')
const commentRoutes = require('./routes/comment')
const authRoutes = require('./routes/auth')

// express app
const app = express()

// middleware
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

// routes
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/auth', authRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('connected to database and listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 