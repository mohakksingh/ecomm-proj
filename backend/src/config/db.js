const mongoose=require('mongoose')

const mondbUrl="mongodb+srv://singhmohak999:Xj3ne8rHFRKZSLnl@ecommproj.qsjz7ba.mongodb.net/"

const connectDb=()=>{
    return mongoose.connect(mondbUrl)
}

module.exports={connectDb}