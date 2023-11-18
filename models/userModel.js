const {
    Schema,
    model
} = require("mongoose")

const validator = require("validator")

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name field can't be empty"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email field can't be empty"],
        lowercase: true,
        trim: true,
        unique: true,
        validate:[validator.isEmail,"enter valid email"]
    },
    password: {
        type: String,
        required: [true, "password field can't be empty"],
        minlength: [8, "password should contain above 8 characters"]

    },
    confirm_password: {
        type: String,
        required: [true, "password field can't be empty"],
        minlength: [8, " confirm password should contain above 8 characters"],
        // custom validation
        validate: function (value) {
            return this.password === value
        },
        message: "password and confirm-password does not match.."
    },
    role: {
        type: String,
        enum: ["user", "admin", "author"],
        default: "admin"
    }

}, {
    timestamps: true
})


// Pre save hook
// userSchema.pre("save",function(){
//     return this.password === this.confirm_password
// })


module.exports = model("user", userSchema)