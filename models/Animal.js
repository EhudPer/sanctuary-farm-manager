const mongoose = require('mongoose')
// mongoose schema
const Schema = mongoose.Schema

// create a schema
const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Animal = mongoose.model('animal', AnimalSchema)
