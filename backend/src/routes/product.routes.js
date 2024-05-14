const express=require('express')
const router=express.Router()

const productController=require('../controller/product.controller')
const authenticate = require('../middleware/authenticate')

router.post('/',authenticate,productController.createProduct)
router.get('/id/:id',authenticate,productController.getAllProducts)

module.exports=router