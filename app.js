const express = require("express")
const userRouter = require("./routes/userRoutes")
const blogRouter = require("./routes/blogRoute")

// const auth = require("./middlewares/authMiddleware")


const app = express(userRouter)

app.use(express.json())
app.use("/app/v1/user",userRouter)


// app.use("/app/v1/profile",auth,blogRoute) ==> we can pass here also
app.use("/app/v1/blogs",blogRouter)

module.exports = app