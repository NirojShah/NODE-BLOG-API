const express = require("express")
const userRouter = require("./routes/userRoutes")

const app = express(userRouter)

app.use(express.json())
app.use("/app/v1/user",userRouter)

module.exports = app