import { catchAsyncError } from "../../middleware/catchError.js"
import { userModel } from "../../../database/models/user.model.js"


const addToAddress=catchAsyncError(async(req,res,next)=>{
    let address=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true})
    !address && res.status(404).json({message:'address not found'})
    address && res.json({message:"success",address:address.addresses})
})

const removeFromAddress=catchAsyncError(async(req,res,next)=>{
    let address=await userModel.findByIdAndDelete(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    !address && res.status(404).json({message:'address not found'})
    address && res.json({message:"success",address:address.addresses})
    //pop => remove last element
    //pull => remove on e you select from array
})

const getLoggedUserAddress=catchAsyncError(async(req,res,next)=>{
    let {addresses}=await userModel.findById(req.user._id) 
    !addresses && res.status(404).json({message:'address not found'})
    addresses && res.json({message:"success",addresses})
})

export {
    addToAddress,
    removeFromAddress,
    getLoggedUserAddress
}