const express = require("express")
const { checkoutPage, payment, successPage } = require("../controllers/stripeController")
const { auth, verifyRole } = require("../middlewares/authMiddleware")

const stripeRoute = express.Router()


// stripeRoute.get("/checkout",auth,verifyRole(["user"]),checkoutPage)
// stripeRoute.post("/create-checkout-session/:id",auth, payment)
stripeRoute.post("/create-checkout-session/:id", payment)
stripeRoute.get("/paid/:id",auth,verifyRole(["user"]),successPage)

module.exports = {stripeRoute}