const {loginWrapper,signupWrapper} = require("../Utils/auth")
const authorModel = require("../models/authorModel")


const login = loginWrapper(authorModel)

const signup = signupWrapper(authorModel)


module.exports = {
    login,
    signup
}
