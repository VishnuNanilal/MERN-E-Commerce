const router = require('express').Router()
const sellerCtrl = require('../controllers/sellerController')

router.post('/register', sellerCtrl.register)
router.patch('/inv/update', sellerCtrl.UpdateInventory)

module.exports = router