const router = require('express').Router()
const productCtrl = require('../controllers/productController')

router.post('/create-product', productCtrl.CreateProduct)

module.exports = router