const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  email: {
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
  images: {
    type: [String],
    //required: true
  },
  cuisine: {
    type: [String],
    //required: true
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

restaurantSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
  }catch(error){
    console.log(error)
  }
}

module.exports = mongoose.model('Restaurant', restaurantSchema)