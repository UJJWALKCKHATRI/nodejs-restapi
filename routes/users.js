const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controller/users");

const User = require('../models/User')
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advanceResults')
const  { protect, authorize } = require('../middleware/auth')

router.use(protect)
router.use(authorize('admin'))

router
.route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser)


router
.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);




module.exports = router;
