const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const mondbUrl=process.env.MONGODB_URL

const connectDb=()=>{
    return mongoose.connect(mondbUrl)
}

module.exports={connectDb}