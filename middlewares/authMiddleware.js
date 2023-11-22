const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const auth = async(req,res,next)=>{
    try{
        let testToken = req.headers.authorization
        let token;
        if(testToken && testToken.startsWith("Bearer")){
            token = testToken.split(" ")[1]
        }
        // console.log(token)
        if(!token){
            res.status(401).json({
                status:"fail",
                data : {
                    msg:"Try logging in, to access"
                }
            })
        }

        const decodedToken = await jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decodedToken.id)
        req.user=user

        if(!user){
            res.status(401).json({
                status:"failed",
                data:{
                    msg:"user no longer exists"
                }
            })
        }

        next()
    }
    
    catch(err){
        res.status(400).json({
            status:"failed",
            data:{
                msg:err.message
            }
        })
    }
}

module.exports = auth;