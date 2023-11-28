const express = require("express")
const userRouter = require("./routes/userRoutes")
const blogRouter = require("./routes/blogRoute")

// const auth = require("./middlewares/authMiddleware")


const app = express(userRouter)

app.use(express.json())
app.use("/app/v1/user",userRouter)


// app.use("/app/v1/profile",auth,blogRoute) ==> we can pass here also
app.use("/app/v1/blogs",blogRouter)



// Exept above route any other route will throw error...

app.all("*",(req,res,next)=>{
    let error = new Error("PAGE NOT FOUND")
    error.statusCode=404,
    error.status = "FAILED"

    next(error)  // used to throw errro..

})


// GLOBAL ERROR HANDLER

app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.status=err.status || "ERROR !!!"
    err.message=err.message || "Something went wrong"

    res.status(err.statusCode).json({
        status:err.status,
        data:{
            msg:err.message
        }
    })
})

module.exports = app