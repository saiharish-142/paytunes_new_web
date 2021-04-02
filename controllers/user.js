const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')


// exports.signup=async(req,res)=>{
//     try{
//         let {password , email, username,usertype}=req.body
//         if(!password||!email||username||usertype){
//             return res.status(400).json({error:'Fill all required fields!'})
//         }

//         let user=await User.findOne({email})
//         if(user){
//             return res.status(400).json({error:'Email already exists! Try another email!'})
//         }

//         password=await bcrypt.hash(password,8)
//         user=new User({
//             email,
//             password,
//             username,
//             usertype
//         })
//         console.log(user)
//         await user.save() 
//         const token= jwt.sign({_id:user._id},JWT_SECRET)
//         res.status(200).json({message:'User signed up successfuly',token,user})
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }

exports.signin=async(req,res)=>{
    try{
        let {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({error:'Please fill all required fields!'})
        }

        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({error:'Invalid Email or Password!'})
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({error:'Invalid Email or Password!'})
        }
        const token=jwt.sign({_id:user._id},JWT_SECRET)
        res.json({message:'Loggedin Successfuly!',token,user})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}