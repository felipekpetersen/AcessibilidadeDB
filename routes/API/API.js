var express = require('express');
var router = express.Router();
var multer = require('multer')

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Plate = mongoose.model('Plate')
const Menu = mongoose.model('Menu')
const Category = mongoose.model('Category')
const Restaurant = mongoose.model('Restaurant')

//Multer
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: async function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3)


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Api Funcionando!');
});

router.post("/upload", function (req, res) {
    try {
        upload(req, res, function (err) {
            if (err) {
                return res.json({ result: false });
            }
            return res.json({ result: true });
        });
    } catch (err) {
        console.log(err)
        return res.json({ result: false });
    }
});

// router.post('/register', async function (req, res, next) {
//     try {
//         let newUse   r = new User(req.body)
//         newUser.password = newUser.hashPassword(newUser.password)
//         await newUser.save()
//         res.json({ result: true })
//     } catch (err) {
//         console.log('Error: ', err)
//         res.json({ result: false })
//     }
// });

router.post('/postRestaurant', async function (req, res, next) {
    try {   

        let newRestaurant = new Restaurant(req.body)
        console.log(newRestaurant)
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
        let response = await Restaurant.find({})
        res.json({ response })

    } catch (err) {
        console.log('Error: ', err)
        res.json({ result: false })
    }
});

router.post('/deleteAll', async function (req, res, next) {
    try {

        Restaurant.remove({}, function (err, removed) {
          console.log(User.length)
        });
        Plate.remove({}, function (err, removed) {
            console.log(User.length)
          });
        Menu.remove({}, function (err, removed) {
            console.log(User.length)
          });
        Category.remove({}, function (err, removed) {
            console.log(User.length)
          });

        res.json({ result: true })
    } catch (err) {
        res.json({ result: false })
      }

});


// router.post('/login', async function (req, res, next) {
//     let email = req.body.email
//     let password = req.body.password

//     try {
//         let user = await User.findOne({
//             email: email
//         }).exec()
//         if (user && user.checkPassword(password)) {
//             res.json(user)
//         } else {
//             res.json({ result: false })
//         }
//     } catch (err) {
//         res.json({ result: false })
//     }
// });



module.exports = router;


