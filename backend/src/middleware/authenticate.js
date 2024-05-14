const jwtProvider=require('../config/jwtProvider')
const userService=require('../services/user.service')
const authenticate=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(401).send({
                message:"Token not found"
            })
        }

        const userId=jwtProvider.getUserIdFromToken(token)
        const user=userService.findUserById(userId)
        req.user=user;
    }catch(e){
        return res.status(401).send({
            message:e.message
        })
    }
    next();
}
module.exports=authenticate