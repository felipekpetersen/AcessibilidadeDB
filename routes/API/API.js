var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Api Funcionando!');
});

router.post('/register', async function (req, res, next) {
    try {
        let novoUsuario = new User(req.body)
        await novoUsuario.save()
        res.send('Gravado com Sucesso!')

    } catch (err){
        console.log('Error: ', err)
        res.send('Falhado!')
    }
});

router.post('/login', function (req, res, next) {
    res.send('Api Funcionando!');
});
module.exports = router;
