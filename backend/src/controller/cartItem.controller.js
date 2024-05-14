const cartItemService = require('../services/cartItem.service');

const updateCartItem=async(req,res)=>{
    const user=await req.user;
    try{
        const updatedCartItem=await cartItemService.updateCartItem(user._id,req.params.id,req.body)
        return res.status(200).send(updatedCartItem)
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

const removeCartItem=async(req,res)=>{
    const user=await req.user;
    try{
        await cartItemService.removeCartItem(user._id,req.params.id)
        return res.status(200).send({
            message:"cart item removed successfully"
        })
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

module.exports={updateCartItem,removeCartItem}