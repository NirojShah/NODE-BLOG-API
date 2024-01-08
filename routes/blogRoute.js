const express = require("express")
const {
    auth,
    verifyRole
} = require("../middlewares/authMiddleware")
const blogModel = require("../models/blog")
const {
    deleteBlog,
    getBlog,
    postBlog,
    updateBlog,
    getBlogs,
    getByAuthor,
    postRating,
    getRating,
    findAuthor
} = require("../controllers/blogController")


const multer = require("multer")
const storage = require("../middlewares/multer")

let blogRouter = express.Router()

const upload = multer({
    storage: storage
})


blogRouter.get("/author", auth, getByAuthor)
blogRouter.post("/", auth, verifyRole(["author", "admin"]), upload.single("image"), postBlog)
blogRouter.get("/", auth, getBlogs)
blogRouter.get("/:id", auth, getBlog)
blogRouter.patch("/:id", auth, verifyRole(["author"]), updateBlog)
blogRouter.post("/rating/:id", auth, verifyRole(["user"]),upload.single("image"), postRating)
blogRouter.get("/rating/:id", auth, verifyRole(["author", "user", "admin"]), getRating)
blogRouter.delete("/:id", auth, verifyRole(["admin", "author"]), deleteBlog)
blogRouter.get("/author/:id", auth, findAuthor)
module.exports = blogRouter