import slugify from 'slugify'
import { catchAsyncError } from "../../middleware/catchError.js"
import { subcategoryModel } from '../../../database/models/subcategory.model.js'
import { deleteOne } from '../handlers/handler.js'
import { ApiFeatures } from '../../utils/apiFeatures.js'

const addSubCategory=catchAsyncError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)//عشان اللي تتضاف تاخد سلاج

    let subcategory=new subcategoryModel(req.body)
    await subcategory.save()
    res.json({message:"success",subcategory})
})

const getAllSubCategory=catchAsyncError(async(req,res,next)=>{

    let filterObj={}
    if(req.params.category){
        filterObj.category =req.params.category
    }//عشان لو هيدمج حاجتين مع بعض

    let apiFeatures = new ApiFeatures(subcategoryModel.find(filterObj),req.query).fields().search().sort().pagination().filter()
    let subcategories = await apiFeatures.mongooseQuery

    !subcategories && res.status(404).json({message:'subcategory not found'})
    subcategories && res.json({message:"success",page:apiFeatures.pageNumber,subcategories})
})

const getSingleSubCategory=catchAsyncError(async(req,res,next)=>{
    let subcategory=await subcategoryModel.findById(req.params.id)
    !subcategory && res.status(404).json({message:'subcategory not found'})
    subcategory && res.json({message:"success",subcategory})
})

const updateSubCategory=catchAsyncError(async(req,res,next)=>{

    if(req.body.name) req.body.slug=slugify(req.body.name)//عشان لو عمل ابديت للصوره بس ميديش ايرور
    
    let subcategory=await subcategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !subcategory && res.status(404).json({message:'subcategory not found'})
    subcategory && res.json({message:"success",subcategory})
})

const deleteSubCategory=deleteOne(subcategoryModel)

export {
    addSubCategory,getAllSubCategory,getSingleSubCategory,updateSubCategory,deleteSubCategory
}