import mongoose from "mongoose"

export const dbConnection=()=>{
    mongoose.connect('mongodb://localhost:27017/halim')
    .then(()=>console.log("db is connected successfully"))
    .catch((err)=>console.log('db failed',err))
}

