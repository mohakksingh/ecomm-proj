const Stripe=require('stripe');
require('dotenv').config()
const orderService=require('./order.service')

const stripe=Stripe(process.env.STRIPE_SECRET_KEY)

const createPaymentIntent=async(orderId)=>{
    try{
        const order=await orderService.findOrderById(orderId)
        const paymentIntent=await stripe.paymentIntents.create({
            amount:order.totalPrice*100,
            currency:'usd',
            metadata:{integration_check:'accept_a_payment'},
            customer:order.user.email
        })
        return paymentIntent
    }catch(e){
        throw new Error(e.message)
    }
}

const updatePaymentInformation=async(reqData)=>{
    const paymentId=reqData.paymentId
    const orderId=reqData.orderId._id

    try{
        const order=await orderService.findOrderById(orderId)
        const payment=await stripe.paymentIntents.retrieve(paymentId)

        if(payment.status==='succeeded'){
            order.paymentDetails.payment=paymentId
            order.paymentDetails.status="COMPLETED"
            order.orderStatus="PLACED"
            await order.save()
        }

        const resData={
            message:"Your order is placed",success:true
        }
        return resData
    }catch(e){
        throw new Error(e.message)
    }
}

const constructEvent=(payload,sig,secret)=>{
    try{
        return stripe.webhooks.constructEvent(payload,sig,secret)
    }catch(e){
        throw new Error(e.message)
    }
}

module.exports={createPaymentIntent,updatePaymentInformation,constructEvent}
