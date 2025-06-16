const jwt = require('jsonwebtoken')
const user = require('../models/UserModel')
const bcrypt = require('bcryptjs')


const generateToken = (id) =>{
    return jwt.sign({id},process.env.jwt_secret_key,{expiresIn:'1h'})
}

const registerUser = async(req,res) =>{
    const {fullname,email,password,profileURL} = req.body;

    if(!fullname || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    try{
        const existingUser = await user.findOne({email})

        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const newUser = await user.create({
            fullname,
            email,
            password,
            profileURL,
        })

        res.status(200).json({
            id:newUser._id,
            user:newUser,
            token:generateToken(newUser._id)
        })
        
    }
    catch(err){
        return res.status(500).json({message:"Error",error:err.message})
    }
}

const logUser = async(req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    try{
        const existingUser = await user.findOne({email})
        
        if(!existingUser ){
            return res.status(400).json({message:"User does not exist"})
        }
        
        const isMatch = await bcrypt.compare(password,existingUser.password,)
        
        if(!isMatch){ 
            return res.status(400).json({message:"Password is incorrect"})
        }
        
        res.status(200).json({
            id:existingUser._id,
            user:existingUser,
            token:generateToken(existingUser._id)
        })
    }
    catch(err){
        return res.status(500).json({message:"Error",error:err.message})
    }
}

const getUserInfo = async(req,res) =>{
    const userId = req.user.id;

    try{
        const existingUser = await user.findById(userId).select("-password")
        
        if(!existingUser){
            return res.status(400).json({message:"User does not exist"})
        }

        res.status(200).json(existingUser)
    }
    catch(err){
        return res.status(500).json({message:"Error",error:err.message})
    }
}

module.exports ={
    registerUser,
    logUser,
    getUserInfo,
}