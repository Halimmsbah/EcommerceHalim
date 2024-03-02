import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code:{
        type:String,
        trim: true,
        required: true,
        
    },
    expires:Date,
    discount:{
        type:Number,
        required: true,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }, 
    Image:String   
},{timestamps: true})

export const couponModel= mongoose.model('coupon',schema)