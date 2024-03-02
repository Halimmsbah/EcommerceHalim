import { brandModel } from "../../../database/models/brand.model.js"
import slugify from 'slugify'
import { catchAsyncError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handler.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"

const addBrand=catchAsyncError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)//عشان اللي تتضاف تاخد سلاج


    req.body.logo=req.file.filename//عشان الصوره اللي تتضاف تاخد اي دي للصوره

    let brand=new brandModel(req.body)
    console.log(brand)
    await brand.save()
    res.json({message:"success",brand})
})

const getAllBrand=catchAsyncError(async(req,res,next)=>{

    let apiFeatures = new ApiFeatures(brandModel.find(),req.query).fields().search().sort().pagination().filter()
    let brand = await apiFeatures.mongooseQuery

    !brand && res.status(404).json({message:'brand not found'})
    brand && res.json({message:"success",brand})
})

const getSingleBrand=catchAsyncError(async(req,res,next)=>{
    let brand=await brandModel.findById(req.params.id)
    !brand && res.status(404).json({message:'brand not found'})
    brand && res.json({message:"success",brand})
})

const updateBrand=catchAsyncError(async(req,res,next)=>{

    if(req.body.name) req.body.slug=slugify(req.body.name)//عشان لو عمل ابديت للصوره بس ميديش ايرور

    
    if(req.file) req.body.logo=req.file.filename//عشان لو عمل ابديت للاسم بس ميديش ايرور

    
    let brand=await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !brand && res.status(404).json({message:'brand not found'})
    brand && res.json({message:"success",brand})
})

const deleteBrand=deleteOne(brandModel)

export {
    addBrand,getAllBrand,getSingleBrand,updateBrand,deleteBrand
}