const express=require('express')
const router=express.Router()

const ratingController=require('../controller/rating.controller')
const authenticate = require('../middleware/authenticate')

router.post('/create',authenticate,ratingController.createRating)
router.get('/product/:productIdd',authenticate,ratingController.getAllRatings)

module.exports=router