const jwt = require("jsonwebtoken")

async function JWTAuthorize(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        if(token){
            let response = jwt.verify(token, process.env.jwt_key)
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
    }   
    catch(err){
        console.lot("JWT Auth failed on Back End")
    }
}