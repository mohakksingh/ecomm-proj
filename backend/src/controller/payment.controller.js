const paymentService=require('../services/paymentService')

const createPaymentLink=async(req,res)=>{
    try{
        const paymentLink=await paymentService.createPaymentLink(req.params.id)
        return res.status(200).send(paymentLink)
    }catch(e){
        return res.status(500).send({message:e.message})
    }
}

const updatePaymentInformation=async(req,res)=>{
    try{
        await paymentService.updatePaymentInformation(req.query)
        return res.status(200).send({
            message:"Payment information updated successfully",
            status:true
        })
    }catch(e){
        return res.status(500).send({message:e.message})
    }
}

module.exports={createPaymentLink,updatePaymentInformation}