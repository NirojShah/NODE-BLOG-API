const blogModel = require("../models/blog")

const postBlog = async (req, res) => {
    try {
        let user = req.user
        const newBlog = await blogModel.create({
            title: req.body.title,
            snippet: req.body.snippet,
            description: req.body.description,
            image: req.body.image,
            author: user._id
        })
        res.status(201).json({
            status: "success",
            data: {
                newBlog
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
        let search = req.query.search || ""
        let all_Blog = await blogModel.find({title:{$regex:search,$options:'i'}});
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