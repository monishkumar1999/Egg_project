const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../utils/constant");

const verifyToken=(req,res,next)=>{
 
    try{
        const token = req.cookies.auth_token || req.headers.authorization?.split(" ")[1];
       
        if(!token)
        {
            
            throw Error("No token provide")
        }

        const decoded= jwt.verify(token,jwt_secret)
        req.admin = decoded; 
       
        next(); 
    }
    catch(err){
      
        res.status(403).json({
            "status":"false",
            "errorMessage":err.message
        })
    }

}

module.exports=verifyToken;