import { productModel } from "../../../database/models/product.model.js"
import slugify from 'slugify'
import { catchAsyncError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handler.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"

const addProduct=catchAsyncError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.title)//عشان اللي تتضاف تاخد سلاج

    if(req.files.imgCover) req.body.imgCover=req.files.imgCover[0].filename//عشان الصوره اللي تتضاف تاخد اي دي للصوره
    
    if(req.files.images) req.body.images=req.files.images.map((img)=>img.filename)

    let product=new productModel(req.body)
    console.log(product)
    await product.save()
    res.json({message:"success",product})
})

const getAllProduct=catchAsyncError(async(req,res,next)=>{

    let apiFeatures = new ApiFeatures(productModel.find(),req.query).fields().search().sort().pagination().filter()
    let product = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,product})
})

const getSingleProduct=catchAsyncError(async(req,res,next)=>{
    let product=await productModel.findById(req.params.id)
    !product && res.status(404).json({message:'product not found'})
    product && res.json({message:"success",product})
})

const updateProduct=catchAsyncError(async(req,res,next)=>{

    if(req.body.name) req.body.slug=slugify(req.body.title)//عشان لو عمل ابديت للصوره بس ميديش ايرور

    req.body.imgCover=req.files.imgCover[0].filename//عشان الصوره اللي تتضاف تاخد اي دي للصوره
    req.body.images=req.files.images.map((img)=>img.filename)

    
    let product=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !product && res.status(404).json({message:'product not found'})
    product && res.json({message:"success",product})
})

const deleteProduct=deleteOne(productModel)

export {
    addProduct,getAllProduct,getSingleProduct,updateProduct,deleteProduct
}