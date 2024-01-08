const express = require("express")
const userRouter = require("./routes/userRoutes")
const blogRouter = require("./routes/blogRoute")
const globalErrorController = require("./controllers/globalErrorController")
const CustomError = require("./Utils/CustomError")
const cors = require("cors")
const authorRouter = require("./routes/authorRoute")
const adminRouter = require("./routes/adminRoute")
const { stripeRoute } = require("./routes/stripeRoute")

// const auth = require("./middlewares/authMiddleware")


const app = express(userRouter)

app.use(express.static("public"))

app.use(cors())

app.use(express.json())
app.use("/app/v1/user", userRouter)
app.use("/app/v1/author",authorRouter)
app.use("/app/v1/admin",adminRouter)


// app.use("/app/v1/profile",auth,blogRoute) ==> we can pass here also
app.use("/app/v1/blogs", blogRouter)

app.use("/app/v1/payment",stripeRoute)


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


// GLOBAL ERROR Controller
app.use(globalErrorController)

module.exports = app