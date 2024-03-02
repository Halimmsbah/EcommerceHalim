import slugify from 'slugify'
import { catchAsyncError } from "../../middleware/catchError.js"
import { reviewModel } from '../../../database/models/review.model.js'
import { deleteOne } from '../handlers/handler.js'
import { ApiFeatures } from '../../utils/apiFeatures.js'
import { AppError } from '../../utils/AppError.js'

const addReview=catchAsyncError(async(req,res,next)=>{
    req.body.user=req.user._id
    let existReview=await reviewModel.findOne({user:req.user._id,product:req.body.product})
    if(existReview) return next(new AppError('you reviewed that before',408))
    let review=new reviewModel(req.body)
    await review.save()
    res.json({message:"success",review})
})

const getAllReview=catchAsyncError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(reviewModel.find(),req.query).fields().search().sort().pagination().filter()
    let review = await apiFeatures.mongooseQuery

    !review && res.status(404).json({message:'Review not found'})
    review && res.json({message:"success",page:apiFeatures.pageNumber,review})
})

const getSingleReview=catchAsyncError(async(req,res,next)=>{
    let review=await reviewModel.findById(req.params.id)
    !review && res.status(404).json({message:'Review not found'})
    review && res.json({message:"success",review})
})

const updateReview=catchAsyncError(async(req,res,next)=>{
    let review=await reviewModel.findByOneAndUpdate({_id:req.params.id},{user:req.user._id},req.body,{new:true})
    !review && res.status(404).json({message:'Review not found'})
    review && res.json({message:"success",review})
})

const deleteReview=deleteOne(reviewModel)

export {
    addReview,getAllReview,getSingleReview,updateReview,deleteReview
}