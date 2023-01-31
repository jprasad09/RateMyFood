const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone_no: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    unique: true,
    required: true
  },
  dob: {
    type: Date
  },
  fav_restaurants: {
    type: [Schema.Types.ObjectId]
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

userSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
  }catch(error){
    console.log(error)
  }
}

module.exports = mongoose.model('User', userSchema)
