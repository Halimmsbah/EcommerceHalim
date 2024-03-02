import { categoryModel } from "../../../database/models/category.model.js"
import slugify from 'slugify'
import { catchAsyncError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handler.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"

const addCategory=catchAsyncError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)//عشان اللي تتضاف تاخد سلاج


    req.body.image=req.file.filename//عشان الصوره اللي تتضاف تاخد اي دي للصوره

    let category=new categoryModel(req.body)
    console.log(category)
    await category.save()
    res.json({message:"success",category})
})

const getAllCategory=catchAsyncError(async(req,res,next)=>{

    let apiFeatures = new ApiFeatures(categoryModel.find(),req.query).fields().search().sort().pagination().filter()
    let categories = await apiFeatures.mongooseQuery

    !categories && res.status(404).json({message:'category not found'})
    categories && res.json({message:"success",categories})
})

const getSingleCategory=catchAsyncError(async(req,res,next)=>{
    let category=await categoryModel.findById(req.params.id)
    !category && res.status(404).json({message:'category not found'})
    category && res.json({message:"success",category})
})

const updateCategory=catchAsyncError(async(req,res,next)=>{

    if(req.body.name) req.body.slug=slugify(req.body.name)//عشان لو عمل ابديت للصوره بس ميديش ايرور

    
    if(req.file) req.body.image=req.file.filename//عشان لو عمل ابديت للاسم بس ميديش ايرور

    
    let category=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !category && res.status(404).json({message:'category not found'})
    category && res.json({message:"success",category})
})

const deleteCategory=deleteOne(categoryModel)

export {
    addCategory,getAllCategory,getSingleCategory,updateCategory,deleteCategory
}