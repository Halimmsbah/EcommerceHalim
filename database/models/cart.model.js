import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },

    cartItems:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:'user'
            },
            quantity:{
                type:Number,
                default:1
            },
            price:Number,
        }
    ],
    totalPrice:Number,
    totalPriceAfterDiscount:Number,
    discount:Number


},{timestamps: true})

export const cartModel= mongoose.model('cart',schema)