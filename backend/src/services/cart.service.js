const Cart=require('../models/cart.model')
const CartItem=require('../models/cartItem.model')
const Product=require('../models/products.model')

async function createCart(user){
    try{
        const cart=new Cart({user})

        const createdCart=await cart.save()
        return createdCart;
    }catch(e){
        throw new Error(e.message)
    }
    
}

async function findUserCart(user){
    try{
        let cart=await Cart.findOne({user:user})
        let cartItems=await CartItem.find({cart:cart._id}).populate('product')
        cart.cartItems=cartItems

        let totalPrice=0;
        let totalDiscountedPrice=0;
        let totalItem=0;

        for(let cartItem of cart.cartItems){
            totalPrice+=cartItem.totalPrice
            totalDiscountedPrice+=cartItem.totalDiscountedPrice
            totalItem +=cartItem.quantity
        }
        cart.totalPrice=totalPrice
        cart.totalItem=totalItem
        cart.totalDiscountedPrice=totalPrice-totalDiscountedPrice
    
        return cart
    }catch(e){
        console.log(e);
        throw new Error(e.message)
    }
}

async function addCartItem(userId, req) {
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = await createCart(userId);
      }
  
      const product = await Product.findById(req.productId);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      const isPresent = await CartItem.findOne({
        cart: cart._id,
        product: req.productId,
        userId,
      });
  
      if (!isPresent) {
        const cartItem = new CartItem({
          product: product._id,
          cart: cart._id,
          quantity: 1,
          userId,
          price: product.price,
          size: req.size,
          discountedPrice: product.discountedPrice,
        });
        const createdCartItem = await cartItem.save();
        cart.cartItems.push(createdCartItem);
        await cart.save();
        return createdCartItem;
      } else {
        isPresent.quantity += 1;
        await isPresent.save();
        return isPresent
      }


    } catch (e) {
      throw new Error(e.message);
    }
  }
module.exports={createCart,findUserCart,addCartItem}