const Rating=require('../models/rating.model')
const productSerivce=require('./product.service')

async function createRating(req,user){
    const product=await productSerivce.findProductById(req.productId)
    const rating =new Rating({
        product:product._id,
        user:user._id,
        rating:req.rating,
        createdAt:new Date()
    })

    return await rating.save()
}

async function getAllRatings (productId){
    return await Rating.find({product:productId})
}

module.exports={
    createRating,
    getAllRatings
}