import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { User } from "../models/index.js"

export const auth = async (req,res,next) => {
    if(req.headers.hasOwnProperty('authorization')){
    
    try{
        const token = req.headers.authorization.split(' ').pop()
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({status: true, _id: new mongoose.Types.ObjectId
        (decoded.id)}).exec()

        if(user != null){
            req.uid = user._id
            req.user = user

            next()
        }else{
            next({message: 'Invalid user',status: 401 })
        }
        
    }catch(e){
        console.error(e)
        next({message: 'Invalid token',status: 401})
    }
    }else{
        next({message:'Authentication failed', status: 401})
    }
    
    
} 

export const adminUser = (req,res,next)=> {
    if(req.user.type == 'Admin'){
        next()
    }else{
        next({message:'Access denied', status: 403})
    }
}

export const customerUser = (req,res,next)=> {
    if(req.user.type == 'Customer'){
        next()
    }else{
        next({message:'Access denied', status: 403})
    }
}


export const genPassword = async(password) => 
    Promise.resolve(bcrypt.hash(password, bcrypt.getRounds(process.env.BCRYPT_SALT)))




