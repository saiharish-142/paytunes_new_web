const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const mongoose = require('mongoose');
const admin = require('../models/user')

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    // console.log(authorization)
    const token = authorization.replace("Bearer ","")
    
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(422).json({error:"you must be logged in"})
        }
         
        const {_id} = payload
        admin.findById(_id).then(loggeduser=>{
            req.user = loggeduser
            next()
        })
    })
}