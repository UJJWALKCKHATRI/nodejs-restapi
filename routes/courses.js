const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require("../controller/courses");

const Course = require('../models/Course')

const  { protect } = require('../middleware/auth')

const advancedResults = require('../middleware/advanceResults')
const router = express.Router({ mergeParams: true });

router
.route('/')
.get(advancedResults(Course,{
    path: 'bootcamp',
    select: 'name'
}), getCourses)
.post(protect, addCourse)

router
.route('/:id')
.get(getCourse)
.put(protect,updateCourse)
.delete(protect, deleteCourse)




module.exports = router;
