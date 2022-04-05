const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload
} = require("../controller/bootcamps");

//include other resource
const courseRouter = require('./courses')

const router = express.Router();

//re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route('/:id/photo').put(bootcampPhotoUpload)

router
.route('/')
.get(getBootcamps)
.post(createBootcamp)

router
.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)
module.exports = router;
