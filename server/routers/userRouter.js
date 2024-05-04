const router = require('express').Router()
const userCtrl = require('../controllers/userController')

router.post('/register', userCtrl.register)
router.get('/sign-in', userCtrl.signIn)
router.get('/authorize', userCtrl.authorize)
module.exports=router