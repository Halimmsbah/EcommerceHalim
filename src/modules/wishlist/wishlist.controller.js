import { catchAsyncError } from "../../middleware/catchError.js"
import { userModel } from "../../../database/models/user.model.js"


const addToWishlist=catchAsyncError(async(req,res,next)=>{
    let wishlist=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true}).populate('wishlist')
    !wishlist && res.status(404).json({message:'wishlist not found'})
    wishlist && res.json({message:"success",wishlist:wishlist.wishlist})
})

const removeFromWishlist=catchAsyncError(async(req,res,next)=>{
    let wishlist=await userModel.findByIdAndDelete(req.user._id,{$pull:{wishlist:req.params.id}},{new:true}).populate('wishlist')
    !wishlist && res.status(404).json({message:'wishlist not found'})
    wishlist && res.json({message:"success",wishlist:wishlist.wishlist})
    //pop => remove last element
    //pull => remove on e you select from array
})

const getLoggedUserWishlist=catchAsyncError(async(req,res,next)=>{
    let {wishlist}=await userModel.findById(req.user._id).populate('wishlist')
    !wishlist && res.status(404).json({message:'wishlist not found'})
    wishlist && res.json({message:"success",wishlist})
    //pop => remove last element
    //pull => remove on e you select from array
})

export {
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist
}