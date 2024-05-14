const express=require('express')
const router=express.Router()
const authenticate=require('../middleware/authenticate')
const paymentController=require('../controller/payment.controller')

router.post('/:id',authenticate,paymentController.createPayment)
router.post ('/webhook',express.raw({type:'application/json'}),paymentController.handleWebhook)

module.exports=router