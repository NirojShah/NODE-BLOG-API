const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const genToken = async (id)=>{
    return await jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:24*60*60
    })
}

let signup = async (req, res) => {
    try {
        // verify whether user is present already...
        const existingUser = await userModel.findOne({
            email: req.body.email
        })
        if (existingUser) {
            return (
                res.status(401).json({
                    status: "failed",
                    data: {
                        msg: "user exists already, try logging in."
                    }
                })
            )
        }

        let new_user = await userModel.create(
            req.body
        )
        const token = genToken(new_user._id)
        res.status(200).json({
            status: "success",
            token,
            data: {
                new_user
            }
        })
    } catch (err) {
        res.status(401).json({
            status: "failed",
            data: {
                msg: err.message
            }
        })
    }
}

const all_User = async (req, res) => {
    try {
        let allUser = await userModel.find()
        res.status(200).json({
            status: "success",
            data: {
                allUser
            }
        })

    } catch (err) {
        res.status(400).json({
            status: "failed",
            data: {
                msg: err.message
            }
        })
    }
}

const get_user = async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            data: {
                msg: err.message
            }
        })
    }
}

let updateProfile = async (req, res) => {
    try {

        let updated_profile = await userModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        res.status(200).json({
            status: "success",
            data: {
                updated_profile
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            data: {
                msg: err.message
            }
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            data: {
                msg: err.message
            }
        })
    }
}

const login = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({
            email: req.body.email
        })
        
        if (!existingUser) {  
            return res.status(400).json({
                status: "failed",
                data: {
                    msg: "you are not an existing user, please signup"
                }
            })
        }
        else{
            const isMatch = await existingUser.comparePassword(req.body.password,existingUser.password)
            if(isMatch===false){
                return res.status(400).json({
                    status: "failed",
                    data: {
                        msg: "your password is incorrect.."
                    }
                })
            }
        }
        
        let token = await genToken(existingUser._id)

        res.status(200).json({
            status: "success",
            token,
            data: {
                existingUser
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: {
                msg: error.message
            }
        })
    }
}

module.exports = {
    signup,
    all_User,
    get_user,
    updateProfile,
    deleteUser,
    login
}