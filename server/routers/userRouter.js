const router = require('express').Router()
const userCtrl = require('../controllers/userController')
const JWTAuthorize = require('../MiddleWares/JWTAuth')

router.post('/register', userCtrl.register)
router.get('/sign-in', userCtrl.signIn)
router.get('/authorize',JWTAuthorize, userCtrl.authorize)

router.post('/order-item', userCtrl.MakeOrder)
// router.post('/add-item', userCtrl.AddItemToCart)

module.exports=router