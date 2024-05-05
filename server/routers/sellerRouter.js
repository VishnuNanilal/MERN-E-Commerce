const router = require('express').Router()
const sellerCtrl = require('../controllers/sellerController')

router.post('/register', sellerCtrl.register)
router.patch('/inv/update-additem', sellerCtrl.UpdateInventoryAddItem)

module.exports = router