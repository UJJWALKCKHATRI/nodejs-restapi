const express = require("express");
const {
  getReviews,
  getReview,
  addReview
  
} = require("../controller/reviews");

const Review = require('../models/Review')

const  { protect, authorize } = require('../middleware/auth')

const advancedResults = require('../middleware/advanceResults')
const router = express.Router({ mergeParams: true });

router
.route('/')
.get(advancedResults(Review,{
    path: 'bootcamp',
    select: 'name description'
}), getReviews).post(protect, authorize('user', 'admin'), addReview)

router
.route('/:id').get(getReview)

module.exports = router;
