const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')


const app=express()

app.use(express.json())
app.use(bodyParser.json());
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({
        message:"Welcome to ecommerce api-node",status:true
    })
})

const authRouters=require('./routes/auth.routes')
app.use('/auth',authRouters)

const userRouters=require('./routes/user.routes')
app.use('/api/users',userRouters)

const productRouter=require('./routes/product.routes')
app.use('/api/products',productRouter)

const adminProductRouter=require('./routes/adminProduct.routes')
app.use('/api/admin/products',adminProductRouter)

const cartRouter=require('./routes/cart.routes')
app.use('/api/cart',cartRouter)

const cartItemRouter=require('./routes/cartItem.routes')
app.use('/api/cart_items',cartItemRouter)

const orderRouter=require('./routes/order.Routes')
app.use('/api/orders',orderRouter)

const adminOrderRouter=require('./routes/adminOrder.routes')  
app.use('/api/admin/orders',adminOrderRouter)

const reviewRouter=require('./routes/review.routes')
app.use('/api/reviews',reviewRouter)

const ratingRouter=require('./routes/rating.routes')
app.use('/api/ratings',ratingRouter)

const paymentRouter=require('./routes/payment.routes')
app.use('/api/payments',paymentRouter)

module.exports=app;