import mongoose from "mongoose";

const schema = new mongoose.Schema({
    text:{
        type:String,
        unique:[true,"text is required"],
        trim: true,
        required: true,
        minLength:[2,"too short review text"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    rate:{
        type:Number,
        required:true,
        min:0,
        max:5
    } , 
},{timestamps: true})

schema.pre(/^find/,function(){
    this.populate('user','name')
})// to show the name of person who commented

export const reviewModel= mongoose.model('review',schema)