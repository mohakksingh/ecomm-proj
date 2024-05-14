const express=require('express')
const authenticate = require('../middleware/authenticate')
const router=express.Router()

const orderController=require('../controller/adminOrder.controller')

router.get('/',authenticate,orderController.getAllOrders)
router.put('/:orderId/confirmed',authenticate,orderController.confirmedOrders)
router.put('/:orderId/ship',authenticate,orderController.shippOrders)
router.put('/:orderId/deliver',authenticate,orderController.deliverOrders)
router.put('/:orderId/cancel',authenticate,orderController.cancelledOrders)
router.put('/:orderId/delete',authenticate,orderController.deletedOrders)

module.exports=router

