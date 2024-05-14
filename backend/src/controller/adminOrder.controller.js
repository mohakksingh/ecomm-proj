const orderService = require('../service/order.service');

const getAllOrders=async(req,res)=>{
    try{
        const orders=await orderService.getAllOrders();
        return res.status(200).send(orders)
    }catch(e){
        res.status(500).send({e:e.message})
    }
}

const confirmedOrders=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.confirmedOrder(orderId)
        return res.status(200).send(orders)
    }catch(e){
        res.status(500).send({e:e.message})
    }
}

const shippOrders=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.shipOrder(orderId)
        return res.status(200).send(orders)
    }catch(e){
        res.status(500).send({e:e.message})
    }
}

const deliverOrders=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.deliverOrder(orderId)
        return res.status(200).send(orders)
    }catch(e){
        res.status(500).send({e:e.message})
    }
}

const cancelledOrder=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.cancelledOrder(orderId)
        return res.status(200).send(orders)
    }catch(e){
        res.status(500).send({e:e.message})
    }
}

const deletedOrders=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.deleteOrder(orderId)
        return res.status(200).send(orders)
    }catch(e){
        res.status(500).send({e:e.message})
    }
}

module.exports={
    getAllOrders,
    confirmedOrders,
    shippOrders,
    deliverOrders,
    cancelledOrder,
    deletedOrders
}



