const blogModel = require("../models/blog")

const postBlog = async (req, res) => {
    try {
        let user = req.user
        const newBlog = await blogModel.create({
            title: req.body.title,
            snippet: req.body.snippet,
            description: req.body.description,
            image: req.body.image,
            author: user._id,
            rating:req.body.rating
        })
        res.status(201).json({
            status: "success",
            data: {
                newBlog,
                orange:"orange"

            }
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            data: {
                msg: error.message
            }
        })
    }
}

const getBlog = async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                blog
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

const getBlogs = async (req, res) => {
    try {
        let page = req.query.page*1 || 1 // *1 to convert string to number.
        let limit = req.query.limit*1 || 3

        let skip = (page-1)*limit // logic for skiping the page...

        let author = req.query.author || ""

        let search = req.query.search || ""  // if search then value will get stored otherwise store empty string.

        let sort = req.query.sort*1 || -1

        // let all_Blog = await blogModel.find({title:{$regex:search,$options:'i'}}).where("author").in([author]).skip(skip).limit(limit).sort({rating:rating});

        let all_Blog = await blogModel.find({title:{$regex:search,$options:'i'}}).skip(skip).limit(limit).sort({"rating":sort})

        //  search logic...
        //  skip to skip no of items
        //  limit the output or response
         


        res.status(200).json({ 
            status: "success",
            data: { 
                all_Blog
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

const updateBlog = async (req, res) => {
    try {
        let payload = {
            ...req.body,
            author: req.user._id
        }
        let id = req.params.id

        const updated_blog = await blogModel.findByIdAndUpdate(id, payload, {
            new: true
        })
        res.status(200).json({
            status: "success",
            data: {
                updated_blog
            }
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            data: {
                msg: error.message
            }
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        let id = req.params.id
        await blogModel.findByIdAndDelete(id)
        res.status(200).json({
            status: "success",
            data: null
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            data: {
                msg: error.message
            }
        })
    }
}

const getByAuthor = async(req,res)=>{

    console.log("hello")

    try {
        let user = req.user
        let author_Blog = await blogModel.find({author:user._id})
        res.status(200).json({
            status:"success",
            data:{
                author_Blog
            }
        })
    } catch (error) {
        res.status(401).json({
            status:"failed",
            data:{
                msg:error.message
            }
        })
    }
}

module.exports = {
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    postBlog,
    getByAuthor
}