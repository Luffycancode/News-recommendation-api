const express= require('express')
const {userSignup,userLogin,getuserpreferences,userpreferencesupdate,getNews} = require('../controller/usercontroller')
const homecontoller=require('../controller/homecontroller')
const authmiddleware= require('../Middleware/Auth_Middleware')
const router= express.Router()


router.get(['/','/home'],homecontoller)
 

router.post(['/register','/users/signup'],userSignup)

router.post(['/login','/users/login'],userLogin)

router.get('/preferences',authmiddleware,getuserpreferences)

router.put('/preferences', authmiddleware, userpreferencesupdate)

router.get('/news', authmiddleware, getNews);

module.exports=router