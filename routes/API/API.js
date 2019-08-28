var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Plate = mongoose.model('Plate')
const Menu = mongoose.model('Menu')
const Category = mongoose.model('Category')
const Restaurant = mongoose.model('Restaurant')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Api Funcionando!');
});



router.post('/register', async function (req, res, next) {
    try {
        let newUser = new User(req.body)
        newUser.password = newUser.hashPassword(newUser.password)
        await newUser.save()
        res.json({ result: true })
    } catch (err) {
        console.log('Error: ', err)
        res.json({ result: false })
    }
});

router.post('/postRestaurant', async function (req, res, next) {
    try {   

        let newRestaurant = new Restaurant(req.body)
        await newRestaurant.save()
        console.log(newRestaurant)
        res.json({ result: true })

    } catch (err) {
        console.log('Error: ', err)
        res.json({ result: false })
    }
});

router.get('/getRestaurants', async function (req, res, next) {
    try {
        let response = Restaurant.find()
        res.json({ response })

    } catch (err) {
        console.log('Error: ', err)
        res.json({ result: false })
    }
});


router.post('/login', async function (req, res, next) {
    let email = req.body.email
    let password = req.body.password

    try {
        let user = await User.findOne({
            email: email
        }).exec()
        if (user && user.checkPassword(password)) {
            res.json(user)
        } else {
            res.json({ result: false })
        }
    } catch (err) {
        res.json({ result: false })
    }
});



module.exports = router;


