const router = require('express').Router()
const productCtrl = require('../controllers/productController')

router.post('/add-product', productCtrl.CreateProduct)

module.exports = router