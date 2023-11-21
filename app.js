const express = require("express")
const userRouter = require("./routes/userRoutes")
const profileRoute = require("./routes/profileRoutes")

// const auth = require("./middlewares/authMiddleware")


const app = express(userRouter)

app.use(express.json())
app.use("/app/v1/user",userRouter)


// app.use("/app/v1/profile",auth,profileRoute) ==> we can pass here also
app.use("/app/v1/profile",profileRoute)

module.exports = app