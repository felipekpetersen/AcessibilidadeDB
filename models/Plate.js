const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')

const Plate = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  priceDouble: {
    type: Number,
    required: true,
  },
  tag: [{
    type: String,
    required: true,
  }],
  tagIlustration: {
    type: String,
    required: true,
  }

}, {timestamps: true})


Plate.plugin(autopopulate)
mongoose.model('Plate', Plate)