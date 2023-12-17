const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const CustomError = require("../Utils/CustomError");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const adminModel = require("../models/adminModel");
const authorModel = require("../models/authorModel")


const auth = asyncErrorHandler(async (req, res, next) => {

    let testToken = req.headers.authorization
    let token;
    if (testToken && testToken.startsWith("Bearer")) {
        token = testToken.split(" ")[1]
    }
    // console.log(token)
    if (!token) {
        res.status(401).json({
            status: "fail",
            data: {
                msg: "Try logging in, to access"
            }
        })
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    // const decodedToken = "1057" 

    let Models = [userModel, authorModel, adminModel]

    let users = Models.map(async (Model) => {
        let users = await Model.findById(decodedToken.id)
        return users;
    })

    users = await Promise.all(users)

    let authorizedUser = await users.filter(doc => doc !== null)


    if (!authorizedUser) {
        // res.status(401).json({
        //     status: "failed",
        //     data: {
        //         msg: "user no longer exists"
        //     }
        // })
        const err = new CustomError(401, "user no longer exists") // throwing error using custom error
        next(err)
    }

    req.user = authorizedUser[0]

    next()
})


const verifyRole = (role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            // return res.status(400).json({
            //     stauts: "failed",
            //     data: {
            //         msg: "you are not authorized"
            //     }
            // })
            const err = new CustomError(400, "you are not authorized") // throwing error using custom errro
            next(err)

        }
        next()
    }
}


// const verifyRole = (role)=>{
//     return (req,res,next)=>{
//         if(req.user.role !== role){
//            return res.status(400).json({
//                 stauts:"failed",
//                 data:{
//                     msg:"you are not authorized"
//                 }
//             })
//         }
//         next()
//     }
// }



module.exports = {
    auth,
    verifyRole
};