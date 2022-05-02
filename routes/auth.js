const express = require("express");

const { register,login, getMe, forgotPassword, resetPassword , updateDeatils, updatePassword} = require ('../controller/auth')

const router = express.Router();

const  { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.put('/updatedetails', protect, updateDeatils)
router.put('/updatepassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router;