const {loginWrapper,signupWrapper} = require("../Utils/auth")
const adminModel = require("../models/adminModel")


const login = loginWrapper(adminModel)

const signup = signupWrapper(adminModel)


module.exports = {
    login,
    signup
}