const mongoose = require('mongoose')
const md5 = require('md5')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')

const User = new Schema({
  username: {
    type: String,
    required: [true, 'user not specified'],
    unique: [true, 'Já existe um usuário com user!']
  },
  password: {
    type: String,
    required: true
  },
  email: String,
  type: {
    type: String,
    required: true
  }
})

User.methods.checkPassword = function (password) {
  let resut = this.password === md5(password)
  return resut
}

User.methods.hashPassword = function (password) {
  return md5(password)
}

/*
User.pre('save', function (next) {
  this.password = md5(this.password)
  next()
})*/

User.plugin(autopopulate)
mongoose.model('User', User)