import slugify from 'slugify'
import { catchAsyncError } from "../../middleware/catchError.js"
import { couponModel } from '../../../database/models/coupon.model.js'
import { deleteOne } from '../handlers/handler.js'
import { ApiFeatures } from '../../utils/apiFeatures.js'
import { AppError } from '../../utils/AppError.js'

const addCoupon=catchAsyncError(async(req,res,next)=>{
    let existCoupon=await couponModel.findOne({code:req.user.code})
    if(existCoupon) return next(new AppError('you used that coupon before',408))
    let coupon=new couponModel(req.body)
    await coupon.save()
    res.json({message:"success",coupon})
})

const getAllCoupon=catchAsyncError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(couponModel.find(),req.query).fields().search().sort().pagination().filter()
    let coupon = await apiFeatures.mongooseQuery

    !coupon && res.status(404).json({message:'coupon not found'})
    coupon && res.json({message:"success",page:apiFeatures.pageNumber,coupon})
})

const getSingleCoupon=catchAsyncError(async(req,res,next)=>{
    let coupon=await couponModel.findById(req.params.id)
    !coupon && res.status(404).json({message:'coupon not found'})
    coupon && res.json({message:"success",coupon})
})

const updateCoupon=catchAsyncError(async(req,res,next)=>{
    let coupon=await couponModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    !coupon && res.status(404).json({message:'coupon not found'})
    coupon && res.json({message:"success",coupon})
})

const deleteCoupon=deleteOne(couponModel)

export {
    addCoupon,getAllCoupon,getSingleCoupon,updateCoupon,deleteCoupon
}