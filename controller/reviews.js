const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorResponse");

exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
      const reviews = await Review.find({ bootcamp: req.params.bootcampId });
  
      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } else {
      res.status(200).json(res.advancedResults);
    }
  });
//get single review

  exports.getReview = asyncHandler(async (req, res, next) => {
  
      const review = await Review.findById(req.params.id).populate({
          path:'bootcamp',
          select:'name description'
      });
      if(!review){
          return next(
              new ErrorResponse(`No review found with id of ${req.params.id}`,404)
          )
      }
      res.status(200).json({
          success:true,
          data:review
      })

  });