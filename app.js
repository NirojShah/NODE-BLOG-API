const express = require("express")
const userRouter = require("./routes/userRoutes")
const blogRouter = require("./routes/blogRoute")
const globalErrorHandler = require("./controllers/globalErrorHandler")
const CustomError = require("./Utils/CustomError")

// const auth = require("./middlewares/authMiddleware")


const app = express(userRouter)

app.use(express.json())
app.use("/app/v1/user", userRouter)


// app.use("/app/v1/profile",auth,blogRoute) ==> we can pass here also
app.use("/app/v1/blogs", blogRouter)



// Exept above route any other route will throw error...

app.all("*", (req, res, next) => {

    // Inbuilt Error class.
    // let error = new Error("PAGE NOT FOUND") // PAGE NOT FOUND - is message. 
    // error.statusCode=404,
    // error.status = "FAILED"

    // next(error)  // used to throw errro..

    // Custom error class.
    let err = new CustomError(404, "PAGE NOT FOUND")
    next(err)

})


// GLOBAL ERROR HANDLER
app.use(globalErrorHandler)

module.exports = app