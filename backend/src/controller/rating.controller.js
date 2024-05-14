const ratingService=require('../services/rating.service')

const createRating=async(req,res)=>{
    const user=req.user;
    try{
        const review=await ratingService.createRating(req.body,user)
        return res.status(201).send(review)
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

const getAllRatings=async(req,res)=>{
    const productId=req.params.productId;
    const user=req.user;
    try{
        const reviews=await ratingService.getAllRatings(productId)
        return res.status(201).send(reviews)
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

module.exports={createRating,getAllRatings}