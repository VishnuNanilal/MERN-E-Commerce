const Seller = require('../models/sellerModel')

async function register(req, res){
    try{
        let response = await Seller.create(req.body)

        if(response){
            res.status(201).send({
                success: true,
                message: "Seller registration successful.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Seller registration failed on DB."
            })
        }
    }
    catch(err){
        console.log("Seller registration failed on Back End.")
    }
}

async function UpdateInventoryAddItem(req, res){
   
    /*
    inventoryItems is of the form {
        product_id: 
        quantity: 
    }
    */
    console.log(">>>",req.body)
    try{
        let response = await Seller.findByIdAndUpdate(req.body.seller_id, 
            {$push: {inventory: req.body.inventoryItems}}, {new: true})
            .populate("inventory.product_id")
            .exec()

        console.log("...",response)
        if(response){
            res.status(201).send({
                success: true,
                message: "Inventory updation successful.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Inventory updation failed on DB."
            })
        }
    }
    catch(err){
        console.log("Inventory updation failed on Back End.")
    }
}

module.exports = {
    register,
    UpdateInventoryAddItem
}