// const razorpay=require('../config/razorpayClient')
// const orderService=require('../services/order.service')

// const createPaymentLink=async(orderId)=>{
//     try{
//         const order=await orderService.findOrderById(orderId)
//         const paymentLinkRequest={
//             amount:order.totalPrice*100,
//             currency:'INR',
//             customer:{
//                 name:order.user.firstName+" "+order.user.lastName,
//                 contact:order.user.mobile,
//                 email:order.user.email
//             },
//             notify:{
//                 sms:true,
//                 email:true
//             },
//             reminder_enable:true,
//             callback_url:`http://localhost:3000/payment/${orderId}`,
//             callback_method:'get',
//         }

    
//         const paymentLink=await razorpay.paymentLink.create(paymentLinkRequest)
//         console.log(paymentLink);
//         const paymentLinkId=paymentLink.orderId
//         const payment_link_url=paymentLink.short_url

//         const resData={
//             paymentLinkId,
//             payment_link_url
//         }
//         return resData
//     }catch(e){
//         throw new Error(e.message)
//     }
// }

// const updatePaymentInformation=async(reqData)=>{
//     const paymentId=reqData.paymentId
//     const orderId=reqData.orderId._id

//     try{
//         const order=await orderService.findOrderById(orderId)
//         const payment=await razorpay.payments.fetch(paymentId)

//         if(payment.status==='captured'){
//             order.paymentDetails.payment=paymentId
//             order.paymentDetails.status="COMPLETED"
//             order.orderStatus="PLACED"
//             await order.save()
//         }

//         const resData={
//             message:"Your order is placed",success:true
//         }
//         return resData
//     }catch(e){
//         throw new Error(e.message)
//     }
// }

// module.exports={createPaymentLink,updatePaymentInformation}