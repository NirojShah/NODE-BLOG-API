const {
    Timestamp
} = require("mongodb")
const {
    Schema,
    model
} = require("mongoose")

const googleSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    googleId: {
        type: String,
        require: true
    }
}, {
    Timestamps: true
})

module.exports = model("googleSchema",googleSchema)