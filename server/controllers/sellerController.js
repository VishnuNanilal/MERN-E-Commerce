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

module.exports = {
    register
}