const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload
} = require("../controller/bootcamps");

const Bootcamp = require('../models/Bootcamp')




//include other resource
const courseRouter = require('./courses')
const reviewRouter = require('./reviews')

const router = express.Router();
const advancedResults = require('../middleware/advanceResults')

const  { protect, authorize } = require('../middleware/auth')
//re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

router
.route('/')
.get(advancedResults(Bootcamp,'courses'), getBootcamps)
.post(protect, authorize('publisher', 'admin'),createBootcamp)

router
.route('/:id')
.get(getBootcamp)
.put(protect, authorize('publisher', 'admin'),updateBootcamp)
.delete(protect, authorize('publisher', 'admin'),deleteBootcamp)
module.exports = router;
