const express=require('express')
const User=require('../models/user')
const router=express.Router()
const controller=require('../controllers/user')
const auth=require('../auth_middleware/auth')

// router.post(
//     '/signup',
//     controller.signup
// )

router.post(
    '/signin',
    controller.signin
)

module.exports=router