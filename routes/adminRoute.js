const express = require("express");
const {login,signup} = require("../controllers/admincontroller")


const adminRoute = express.Router()

adminRoute.post("/login",login)
adminRoute.post("/signup",signup)


module.exports = adminRoute