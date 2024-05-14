const userService=require('../services/user.service')
const CartItem = require('../models/cartItem.model')

async function updateCartItem(userId,cartItemId,cartItemData){
    console.log(userId,cartItemId,cartItemData);
    try{
        const item=await findCartItemById(cartItemId)

        if(!item){
            throw new Error ("Cart item not found",cartItemId)
        }
        const user=await userService.findUserById(item.userId)
        if(!user){
            throw new Error("User not found",userId)
        }

        if(user._id.toString()===userId.toString()){
            item.quantity=cartItemData.quantity
            item.price=item.quantity*item.product.price
            item.discountedPrice=item.quantity*item.product.discountedPrice
            const updateCartItem=await item.save()
            return updateCartItem
        }else{
            throw new Error("You cannot update this cart item")
        }
    }catch(e){
        throw new Error(e.message)
    }
}


async function removeCartItem(userId,cartItemId){
    const cartItem=await findCartItemById(cartItemId);
    const user=await userService.findUserById(userId)
    
    if(user._id.toString()===cartItem.userId.toString()){
        return await CartItem.findByIdAndDelete(cartItemId)
    }
    throw new Error("you cannot remove another user's item")
}


async function findCartItemById(cartItemId){
    const cartItem=await CartItem.findById(cartItemId).populate('product')
    if(cartItem){
        return cartItem
    }else{
        throw new Error("Cart item not found")
    }
}

module.exports={
    updateCartItem,
    removeCartItem,
    findCartItemById
}

