const mongoose = require('mongoose')
const md5 = require('md5')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')

const User = new Schema({
  nome: {
    type: String,
    required: [true, 'user not specified'],
    unique: [true, 'Já existe um usuário com user!']
  },
  senha: {
    type: String,
    required: true
  },
  email: String
})

User.methods.checkPassword = function (senha) {
  let resut = this.senha === md5(senha)
  return resut
}

User.methods.hashPassword = function (senha) {
  return md5(senha)
}

/*
User.pre('save', function (next) {
  this.password = md5(this.password)
  next()
})*/

User.plugin(autopopulate)
mongoose.model('User', User)