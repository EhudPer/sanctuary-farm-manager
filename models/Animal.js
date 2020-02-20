const mongoose = require('mongoose')
// mongoose schema
const Schema = mongoose.Schema

// create a schema
const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  image_public_url: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Animal = mongoose.model('animal', AnimalSchema)
