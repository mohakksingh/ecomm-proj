const mongoose=require('mongoose')

const paymentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orders",
    },
    paymentId:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        default:"PENDING"
    },
    paymentDate:{
        type:Date,
        default:Date.now()
    },
    paymentAmount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    }   
})

module.exports=mongoose.model('payments',paymentSchema)
