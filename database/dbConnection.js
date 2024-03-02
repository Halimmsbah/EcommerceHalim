import mongoose from "mongoose"

export const dbConnection=()=>{
    mongoose.connect('mongodb+srv://HalimEcommerce:Halim1143@cluster0.x9fviy1.mongodb.net/Ecommerce')
    .then(()=>console.log("db is connected successfully"))
    .catch((err)=>console.log('db failed',err))
}