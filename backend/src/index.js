const express=require('express')

const cors=require('cors')


const app=express()

app.use(express.json())
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


module.exports=app;