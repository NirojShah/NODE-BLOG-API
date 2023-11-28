module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "ERROR !!!"
    err.message = err.message || "Something went wrong"

    res.status(err.statusCode).json({
        status: err.status,
        data: {
            msg: err.message
        }
    })
}