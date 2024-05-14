const Seller = require('../models/sellerModel')

const register = async (req, res) => {
    try {
        let response = await Seller.create(req.body)

        if (response) {
            res.status(201).send({
                success: true,
                message: "Seller registration successful.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Seller registration failed on DB."
            })
        }
    }
    catch (err) {
        console.log("Seller registration failed on Back End.")
    }
}

const UpdateInventoryAddItem = async (req, res) => {
    /*
    inventoryItems is of the form {
        product_id: 
        quantity: 
    }
    */
    console.log(">>>", req.body)
    try {
        let response = await Seller.findByIdAndUpdate(req.body.seller_id,
            { $push: { inventory: req.body.inventoryItems } }, { new: true })
            .populate("inventory.product_id")
            .exec()

        console.log("...", response)
        if (response) {
            res.status(201).send({
                success: true,
                message: "Inventory updation addition successful.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Inventory updation addition failed on DB."
            })
        }
    }
    catch (err) {
        console.log("Inventory updation addition failed on Back End.")
    }
}

const UpdateInventoryReduceItem = async (req, res) => {
    /*
    req.body is of the form {
        seller_id:
        product_id: 
        quantity: //reduce quantity
    }
    */
    try {
        let seller = await Seller.findById(req.body.seller_id)
        if (seller) {
            let inventoryItem = seller.inventory.find(inventoryItem => inventoryItem.product_id + "" == req.body.product_id + "")
            if (!inventoryItem) {
                res.status(404).send({
                    success: false,
                    message: "Inventory updation reduction failed on DB. Product was not found"
                })
                return;
            }

            if (inventoryItem.quantity < req.body.quantity) { //Implement on FE to make sure not to be able to reduce more than available quantity.
                res.status(404).send({
                    success: false,
                    message: "Inventory updation failed on DB. Reduce quantity less than product quantity."
                })
                return;
            }

            inventoryItem.quantity -= req.body.quantity
            response = await seller.save()
            res.status(201).send({
                success: true,
                message: "Inventory updation reduction successful.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Inventory updation reduction failed on DB. Seller was not found"
            })
        }
    }
    catch (err) {
        console.log("Inventory updation failed on Back End.")
    }
}

const UpdateInventoryRemoveItem = async (req, res) => {

    /*
    inventoryItems is of the form {
        seller_id:
        product_id: 
    }
    */
    console.log(">>>", req.body)
    try {
        let response = await Seller.findByIdAndUpdate(req.body.seller_id,
            { $pull: { inventory: req.body.inventoryItems } }, { new: true })
            .populate("inventory.product_id")
            .exec()

        console.log("...", response)
        if (response) {
            res.status(201).send({
                success: true,
                message: "Inventory updation removal successful.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Inventory updation removal failed on DB."
            })
        }
    }
    catch (err) {
        console.log("Inventory updation removal failed on Back End.")
    }
}

module.exports = {
    register,
    UpdateInventoryAddItem,
    UpdateInventoryReduceItem,
    UpdateInventoryRemoveItem
}