const stripe = require("stripe")(
    "sk_test_51O5R2kSCi320FAxpfOupAoCwckxAPfWdAquURzGgsGq4mJqadlytA5lYH8xi6i7wU8ruWR1HZbt3beB2hMFmS2BC00bgZr5o5o"
);
const blogModel = require("../models/blog")
const router = require("express").Router();

const MY_DOMAIN = "http://localhost:5173/";
const checkoutPage = async (req, res) => {
    const blog = await blogModel.findById(req.params.id).populate("author");
    console.log(blog)
    res.status(200).json({
        status:"success",
        data:{
            blog
        }
    })
};

const payment = async (req, res) => {
    const blog = await blogModel.findById(req.params.id);
    console.log(blog)
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: blog.title,
                },
                unit_amount: blog.price * 100,
            },
            quantity: 1,
        }, ],
        mode: "payment",
        success_url: `${MY_DOMAIN}/success/${blog._id}/`,
        cancel_url: `${MY_DOMAIN}/cancel`,
    });

    res.redirect(303, session.url);
};

const successPage = async (req, res) => {
    const blogId = req.params.blogId
    const buyedBlog = await Blog.findById(blogId)
    await buyedBlog.buyedBy.push(req.user._id)
    const newB = await buyedBlog.save()

    res.render("Checkout/success");

};

const cancelPage = (req, res) => {
    res.render("Checkout/cancel");
};

module.exports = {
    successPage,
    cancelPage,
    payment,
    checkoutPage
};