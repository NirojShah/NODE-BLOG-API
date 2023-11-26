const userModel = require("./userModel")


const {
    model,
    Schema
} = require("mongoose")


const blogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"]
    },
    snippet: {
        type: String,
        trim: true,
        required: [true, "Snippet is required"],
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Description is required"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Author is required"]

    },
    image: {
        type: [String],
        default: "https://digitalmarketerschicago.com/wp-content/uploads/2019/07/difference-between-blogs-and-landing-pages.jpg"
    },
    rating:{
        type:Number,
        required:[true,"rating"],
        default:1,
        validator:{
            validate:function(){
                if(userModel.role !== "user"){
                    return value>=1 && value<=5;
                }
            },
            message:"you are not authorize"
        }
    }
})

module.exports = model("blog", blogSchema)