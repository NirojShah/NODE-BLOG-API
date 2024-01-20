const blogModel = require("../models/blog")
const ratingModel = require("../models/rating")
const authorModel = require("../models/authorModel")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")
const PATH = require("path")

const postBlog = asyncErrorHandler(async (req, res) => {
    let user = req.user
    let {
        fieldname,
        originalname,
        encoding,
        destination,
        mimetype,
        filename,
        path
    } = req.file
    const dir = PATH.join(__dirname, "../" + path)
    const newBlog = await blogModel.create({
        title: req.body.title,
        snippet: req.body.snippet,
        description: req.body.description,
        author: user._id,
        image: {
            fieldname,
            originalname,
            encoding,
            destination,
            mimetype,
            filename,
            dir
        },
        price: req.body.price
    })
    res.status(201).json({
        status: "success",
        data: {
            newBlog
        }
    })
})

const getBlog = asyncErrorHandler(async (req, res) => {
    let blog = await blogModel.findById(req.params.id).populate("author")
    if (req.user.role === "user") {
        if (blog.ownedBy.includes(req.user._id)) {
            res.status(200).json({
                status: "success",
                data: {
                    blog: {
                        author: blog.author,
                        title: blog.title,
                        snippet: blog.snippet,
                        description: blog.description,
                        rating: blog.rating,
                        price: blog.price,
                        iamge: blog.image,
                        own: true

                    }
                }
            })
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    blog: {
                        author: blog.author,
                        title: blog.title,
                        snippet: blog.snippet,
                        description: blog.description.slice(0, 520),
                        rating: blog.rating,
                        price: blog.price,
                        iamge: blog.image,
                        own: false
                    }
                }
            })
        }
    } else if (req.user.role === "admin" || req.user.role === "author") {

        res.status(200).json({
            status: "success",
            data: {
                blog: {
                    author: blog.author,
                    title: blog.title,
                    snippet: blog.snippet,
                    description: blog.description,
                    rating: blog.rating,
                    price: blog.price,
                    iamge: blog.image,
                    own: true

                }
            }
        })

    }

})

const postRating = asyncErrorHandler(async (req, res) => {
    let user = req.user
    let blogid = req.params.id
    let rate = req.body.rating

    const existingRating = await ratingModel.findOne({
        "user": user._id,
        "blog": blogid
    })
    if (existingRating) {
        existingRating.ratings = rate
        let rating = await existingRating.save()
        return res.status(201).json({
            status: "success",
            data: {
                rating
            }
        })
    }
    let rating = await ratingModel.create({
        ratings: rate,
        user: user._id,
        blog: blogid
    })
    res.status(201).json({
        status: "success",
        data: {
            rating
        }
    })

})

const getRating = asyncErrorHandler(async (req, res) => {
    let blogId = req.params.id
    const ratings = await ratingModel.find({
        blog: blogId
    }).populate("user")
    res.status(200).json({
        status: "success",
        data: {
            ratings
        }
    })
})



const getBlogs = asyncErrorHandler(async (req, res) => {

    let page = req.query.page * 1 || 1 // *1 to convert string to number.
    let limit = req.query.limit * 1 || 3

    let skip = (page - 1) * limit // logic for skiping the page...

    let author = req.query.author || ""

    let search = req.query.search || "" // if search then value will get stored otherwise store empty string.

    // let sort = req.query.sort * 1 || -1

    let sort = req.query.sort || "rating" // default decending order... // sort=-rating accending order


    // rating,year // rating year

    sort && sort.split(",").join(" ")

    // let all_Blog = await blogModel.find({title:{$regex:search,$options:'i'}}).where("author").in([author]).skip(skip).limit(limit).sort({rating:rating});

    // let all_Blog = await blogModel.find({
    //     title: {
    //         $regex: search,
    //         $options: 'i'
    //     }
    // }).skip(skip).limit(limit).sort({
    //     "rating": sort
    // })

    let all_Blog = await blogModel.find({
        title: {
            $regex: search,
            $options: 'i'
        }
    }).skip(skip).limit(limit).sort(sort).populate("author")




    //  search logic...
    //  skip to skip no of items
    //  limit the output or response


    const totalBlog = await blogModel.countDocuments()


    res.status(200).json({
        status: "success",
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalBlog / limit),
        previous: page - 1,
        next: page + 1,
        data: {
            all_Blog
        }
    })
})

const updateBlog = asyncErrorHandler(async (req, res) => {

    let payload = {
        title: req.body.title,
        snippet: req.body.snippet,
        description: req.body.description,
        author: req.user._id,
        image: req.body.image

    }
    let id = req.params.id

    const updated_blog = await blogModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: "success",
        data: {
            updated_blog
        }
    })

})

const deleteBlog = asyncErrorHandler(async (req, res) => {
    let id = req.params.id
    await blogModel.findByIdAndDelete(id)
    res.status(200).json({
        status: "success",
        data: null
    })

})

const getByAuthor = asyncErrorHandler(async (req, res) => {

    let user = req.user
    let author_Blog = await blogModel.find({
        author: user._id
    }).populate("author")
    res.status(200).json({
        status: "success",
        data: {
            author_Blog
        }
    })
})

const findAuthor = asyncErrorHandler(async (req, res) => {
    let authorId = req.params.id
    console.log(authorId)
    let authorData = await authorModel.findOne({
        "_id": authorId
    })
    console.log(authorData.name)
    res.status(201).json({
        status: "success",
        data: {
            name: authorData.name
        }
    })
})
module.exports = {
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    postBlog,
    getByAuthor,
    postRating,
    getRating,
    findAuthor
}