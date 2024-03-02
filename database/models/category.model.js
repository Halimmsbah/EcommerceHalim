import mongoose from "mongoose";
import dotenv from 'dotenv'

const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"name is required"],
        trim: true,
        required: true,
        minLength:[2,"too short category name"]
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    image:String   
},{timestamps: true})

schema.post('init',function(doc){
    doc.image= process.env.baseURL+"uploads/"+doc.image //مش راضيه تشتغل
})//عشان يظهرلي اللينك واضغط عليه يوديني للصوره

export const categoryModel= mongoose.model('category',schema)