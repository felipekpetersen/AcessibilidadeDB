const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')

const Ocorrencia = new Schema({
  location: {
    lat: String,
    long: String
  },
  category: String,
  subcategory: String
})


Ocorrencia.plugin(autopopulate)
mongoose.model('Ocorrencia', Ocorrencia)