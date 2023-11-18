const express = require("express")
const {
    signup,
    all_User,
    get_user,
    updateProfile,
    deleteUser
} = require("../controllers/userController")

let userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.get("/", all_User)
userRouter.get("/:id", get_user)
userRouter.patch("/:id", updateProfile)
userRouter.delete("/:id", deleteUser)


module.exports = userRouter