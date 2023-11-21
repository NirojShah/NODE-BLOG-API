const express = require("express")
const auth  = require("../middlewares/authMiddleware")

let profileRoute = express.Router()

profileRoute.get("/",auth,(req,res)=>{

    const user = req.user

    res.send("hello Welcome "+user.name)
})


module.exports = profileRoute   