const express = require("express")
const {auth,verifyRole}  = require("../middlewares/authMiddleware")
const blogModel = require("../models/blog")
const {deleteBlog,getBlog,postBlog,updateBlog,getBlogs,getByAuthor,postRating,getRating} = require("../controllers/blogController")

let blogRouter = express.Router()

blogRouter.get("/author",auth,getByAuthor)
blogRouter.post("/",auth,verifyRole(["author","admin"]),postBlog)
blogRouter.get("/",auth,getBlogs)
blogRouter.get("/:id",auth,getBlog)
blogRouter.patch("/:id",auth,verifyRole(["author"]),updateBlog)
blogRouter.post("/rating/:id",auth,verifyRole(["user"]),postRating)
blogRouter.get("/rating/:id",auth,verifyRole(["author","user","admin"]),getRating)
blogRouter.delete("/:id",auth,verifyRole(["admin","author"]),deleteBlog)
module.exports = blogRouter

