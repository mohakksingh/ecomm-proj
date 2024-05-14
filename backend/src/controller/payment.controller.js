const stripeServices=require('../services/stripe.service');

const createPayment=async(req,res)=>{
    const { id:orderId}=req.params;
    try{
        const paymentIntent=await stripeServices.createPaymentIntent(orderId)
        res.send({
            clientSecret:paymentIntent.client_secret
        })
    }catch(e){
        res.status(500).send({
            error:e.message
        })
    }
}

const handleWebhook=async(req,res)=>{
    const sig=req.headers['stripe-signature']
    let event;
    try{
        event=stripeServices.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
    }catch(e){
        res.status(500).send(
            `Webhook Error:${e.message}`
        )
    }
     
    switch(event.type){
        case 'payment_intent.succeeded':
            const paymentIntent=event.data.object
            stripeServices.updatePaymentInformation({
                paymentId:paymentIntent.id,
                orderId:paymentIntent.metadata.orderId
            })
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({
        received:true
    })
}

module.exports={createPayment,handleWebhook}    