const express=require('express')
const router=express.Router()

const productController=require('../controller/product.controller')
const authenticate = require('../middleware/authenticate')

router.get('/id/:id',authenticate,productController.findProductById)
router.get('/',authenticate,productController.getAllProducts)

module.exports=router