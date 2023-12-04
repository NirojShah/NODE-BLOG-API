const express = require("express")
const {login,signup} = require("../controllers/authorController")

const authorRouter = express.Router()

authorRouter.post("/login",login)
authorRouter.post("/signup",signup)

module.exports = authorRouter;