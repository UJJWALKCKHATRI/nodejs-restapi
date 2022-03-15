const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next) =>{
    let error = { ...err }

    error.message =  err.message;

    console.log(err)

    if(err.name ==='CastError'){
        const message = `Bootcamp not found with id of ${req.params.id}`;
        error = new ErrorResponse(message,404);
    }
    // Mongoose duplicate keys
    if(err.code === 11000){
        const message = 'Duplicate field Value';
        error = new ErrorResponse(message,400)
    }
    //mongoose validation error
    if (err.name ==='ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400)
    }
    res.status(error.statusCode || 500).json({
        sucess:false,
        error: error.message || 'Server error'
    })
}

module.exports = errorHandler;