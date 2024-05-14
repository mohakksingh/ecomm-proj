const orderService=require('../services/orderService')

const createOrder=async(req,res)=>{
    const user=req.user;
    try{
        let createdOrder=await orderService.createOrder(user,req.body)
        res.status(200).send(createdOrder)
    }catch(e){
        res.status(500).send({message:e.message})
    }
}

const findOrderById=async(req,res)=>{
    const user=req.user;
    try{
        let findOrder=await orderService.findOrderById(req.params.id)
        res.status(200).send(findOrder)
    }catch(e){
        res.status(500).send({message:e.message})
    }
}

const orderHistory=async(req,res)=>{
    const user=req.user;
    try{
        let orderHistory=await orderService.usersOrderHistory(user._id)
        return res.status(200).send(orderHistory)
    }catch(e){
        return res.status(500).send({
            e:e.message
        })
    }
}

module.exports={createOrder,findOrderById,orderHistory}

