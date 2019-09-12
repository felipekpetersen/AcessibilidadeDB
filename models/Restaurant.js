const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')

const Restaurant = new Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  category: [{
    type: String,
    required: true
  }],
  phone: {
    type: String,
    required: true
  },
  menus: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    categories: [{
      name: {
        type: String,
        required: true
      },
      plates: [{
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
          type: String,
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
      }]
    
    }]
  }]
  

}, {timestamps: true})


Restaurant.plugin(autopopulate)
mongoose.model('Restaurant', Restaurant)