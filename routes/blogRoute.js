const express = require("express")
const auth  = require("../middlewares/authMiddleware")
const blogModel = require("../models/blog")
const {deleteBlog,getBlog,postBlog,updateBlog,getBlogs,getByAuthor} = require("../controllers/blogController")

let blogRouter = express.Router()

blogRouter.post("/",auth,postBlog)
blogRouter.get("/",auth,getBlogs)
blogRouter.get("/:id",auth,getBlog)
blogRouter.patch("/:id",auth,updateBlog)
blogRouter.delete("/:id",auth,deleteBlog)
blogRouter.get("/author/:id",auth,getByAuthor)

module.exports = blogRouter   