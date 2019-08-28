const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')

const Category = new Schema({
  name: {
    type: String,
    required: true
  },
  plates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plate',
    autopopulate: true
  }]

}, {timestamps: true})


Category.plugin(autopopulate)
mongoose.model('Category', Category)