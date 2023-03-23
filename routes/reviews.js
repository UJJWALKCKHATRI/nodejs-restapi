const express = require("express");
const {
  getReviews,
  getReview,
  
} = require("../controller/reviews");

const Review = require('../models/Review')

const  { protect } = require('../middleware/auth')

const advancedResults = require('../middleware/advanceResults')
const router = express.Router({ mergeParams: true });

router
.route('/')
.get(advancedResults(Review,{
    path: 'bootcamp',
    select: 'name description'
}), getReviews)

router
.route('/:id').get(getReview)

module.exports = router;
