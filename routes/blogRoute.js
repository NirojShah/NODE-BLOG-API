const express = require("express")
const {auth,verifyRole}  = require("../middlewares/authMiddleware")
const blogModel = require("../models/blog")
const {deleteBlog,getBlog,postBlog,updateBlog,getBlogs,getByAuthor} = require("../controllers/blogController")

let blogRouter = express.Router()

blogRouter.get("/author",auth,getByAuthor)
blogRouter.post("/",auth,verifyRole(["author","admin"]),postBlog)
blogRouter.get("/",auth,getBlogs)
blogRouter.get("/:id",auth,getBlog)
blogRouter.patch("/:id",auth,updateBlog)
blogRouter.delete("/:id",auth,deleteBlog)

module.exports = blogRouter   