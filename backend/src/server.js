const app=require(".");
const { connectDb } = require("./config/db");
const dotenv=require('dotenv')
dotenv.config()

PORT=process.env.PORT
app.listen(PORT,async()=>{
    await connectDb();
    console.log("ecoomerce running on PORT :",PORT);
})