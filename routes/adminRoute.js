const express = require("express");


let adminRoute = express.Router()

adminRoute.get("/",auth,veri)