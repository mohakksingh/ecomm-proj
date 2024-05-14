const User = require("../models/user.model");
const bcrypt=require('bcrypt')
const jwtProvider=require('../config/jwtProvider')

const createUser=async(userData)=>{
    try{
        let{firstName,lastName,email,password}=userData;
        const isUserExist=await User.findOne({email})
        if(isUserExist){
            throw new Error("User already exist with email:",email)
        }
        password=await bcrypt.hash(password,8)

        const user=await User.create({firstName,lastName,email,password})
        console.log(user);
        return user;

    }catch(e){
        throw new Error(e.message)
    }
}

const findUserById=async(userId)=>{
    try{
        const user=await User.findById(userId)
        // .populate("address")
        if(!user){
            throw new Error("user not found with Id:",userId)
        }
        return user;
    }catch(e){
        throw new Error(e.message)
    }
}

const getUserByEmail=async(email)=>{
    try{
        const user=await User.findOne({email})
        if(!user){
            throw new Error("user not found with email:",email)
        }
        return user;
    }catch(e){
        throw new Error(e.message)
    }
}

const getUserProfileByToken=async(token)=>{
    try{
        const userId=jwtProvider.getUserIdFromToken(token)
        const user=await findUserById(userId)
        if(!user){
            throw new Error("user not found with Id:",userId)
        }
        return user;
    }catch(e){
        throw new Error(e.message)
    }
}

const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        return users;

    }catch(e){
        throw new Error(e.message)
    }
}

module.exports={createUser,findUserById,getUserByEmail,getUserProfileByToken,getAllUsers}
