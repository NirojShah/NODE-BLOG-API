const CustomError = require("../Utils/CustomError")

const devError = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        errorStack: err.stack
        
    })
}

const prodError = (res, err) => {
    if (err.isOperational === true) {
        res.status(err.statusCode).json({
            status: err.status,
            data: {
                msg: err.message
            }
        })
    } else {
        res.status(err.statusCode).json({
            status: "failed",
            data: {
                msg: "Something went wrong"
            }
        })
    }
}

const validationError = (err)=>{
    let errArray = Object.values(err.errors)
    let msgArray = errArray.map(doc=>doc.message)
    let msg = msgArray.join(" , ")
    let error = new CustomError(401,msg)
    return error
}

const duplicateErrorHandler = (err)=>{
    let email = err.keyValue.email
    let msg = `the ${email} is already present`

    let error = new CustomError(401,msg)
    return error
}

const castError = (err)=>{
    let value = err.value
    let error = new CustomError(400,`${value} invalid object id`)
    return error
}

const TokenExpiredError = (err) =>{
    let msg = `${err.message} at ${err.expiredAt}.`
    let error = new CustomError(400,msg)
    return error
}

const jsonWebTokenError = (err)=>{
    let msg = `${err.message } please verify`
    let error = new CustomError(400,msg)
    return error
}

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.status = err.status || "ERROR!!!"

    if (process.env.NODE_ENV === "development") {
        devError(res, err)
    }

    if (process.env.NODE_ENV === "production") {
        if(err.name=="ValidationError"){
            err = validationError(err)
        }
        if(err.code===11000){
           err = duplicateErrorHandler(err)
        }
        if(err.name === "CastError"){
            err = castError(err)
        }
        if(err.name === "TokenExpiredError"){
            err = TokenExpiredError(err)
        }
        if(err.name === "JsonWebTokenError"){
            err = jsonWebTokenError(err)
        }
        prodError(res, err)
    }
}