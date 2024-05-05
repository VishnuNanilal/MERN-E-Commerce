const router = require('express').Router()
const sellerCtrl = require('../controllers/sellerController')

router.post('/register', sellerCtrl.register)
router.patch('/inv/update-additem', sellerCtrl.UpdateInventoryAddItem)
router.patch('/inv/update-reduceitem', sellerCtrl.UpdateInventoryReduceItem)
router.patch('/inv/update-removeitem', sellerCtrl.UpdateInventoryRemoveItem)

module.exports = router