const app=require(".");
const { connectDb } = require("./config/db");

PORT=3000
app.listen(PORT,async()=>{
    await connectDb();
    console.log("ecoomerce running on PORT :",PORT);
})