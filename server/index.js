require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user')
const restaurantRoutes = require('./routes/restaurant')
const reviewRoutes = require('./routes/review')
const commentRoutes = require('./routes/comment')
const signinRoute = require('./routes/signin')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/signin', signinRoute)

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