const Product = require('../models/productModel')

async function CreateProduct(req, res){
    try{
        let response = await Product.create(req.body)
        console.log("productController.js>>>", response)
        if(response){
            res.status(201).send({
                success: true,
                message: "Product creation successful.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Product creation  failed on DB."
            })
        }
    }
    catch(err){
        console.log("Product creation failed on Back End.")
    }
}

async function DeleteProduct(req, res){
    try{
        let response = await Product.findByIdAndDelete(req.body.product_id)
        console.log("productController.js>>>", response)
        if(response){
            res.status(201).send({
                success: true,
                message: "Product deletion successful.",
                data: response
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "Product deletion  failed on DB."
            })
        }
    }
    catch(err){
        console.log("Product deletion failed on Back End.")
    }
}

module.exports = {
    CreateProduct
}