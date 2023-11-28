class CustomError extends Error {
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode;
        this.status=statusCode>=400 && statusCode<=500 ? "FAIL !!":"error";
    }
}

module.exports = CustomError