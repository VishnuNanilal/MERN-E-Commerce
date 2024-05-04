const router = require('express').Router()
const sellerCtrl = require('../controllers/sellerController')

router.post('/register', sellerCtrl.register)

module.exports = router