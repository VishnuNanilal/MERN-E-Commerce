const jwt = require("jsonwebtoken")

async function JWTAuthorize(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        if(token){
            let response = jwt.verify(token, process.env.jwt_key)
            console.log(">>>", response)
            if(response){
                req.body.id = response.id
            }
            else{
                req.body = null
            }
        }
        else{
            req.body = null
        }
        next()
    }   
    catch(err){
        console.lot("JWT Auth failed on Back End")
    }
}

module.exports = JWTAuthorize