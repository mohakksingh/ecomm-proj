
const cartService=require('../services/cart.service')

const findUserCart=async(req,res)=>{
    const user=req.user
    try{
        const cart=await cartService.findUserCart(user._id)
        return res.status(200).send(cart)
    }catch(e){
        console.log(e);
        return res.status(500).send({
            message:e.message
        })
    }
}


const addItemToCart=async(req,res)=>{
    const user=req.user
    try{
        const cartItem=await cartService.addCartItem(user._id,req.body)
        console.log(req.body);
        return res.status(200).send(cartItem)
    }catch(e){
        console.log(e);
        return res.status(500).send({
            message:e.message
        })
    }
}

module.exports={findUserCart,addItemToCart}