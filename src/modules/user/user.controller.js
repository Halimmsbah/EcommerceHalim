import { catchAsyncError } from "../../middleware/catchError.js"
import { userModel } from '../../../database/models/user.model.js'
import { deleteOne } from '../handlers/handler.js'
import { ApiFeatures } from '../../utils/apiFeatures.js'



const addUser=catchAsyncError(async(req,res,next)=>{


    let user=new userModel(req.body)
    await user.save()
    res.json({message:"success",user:{name:user.name,email:user.email}})
})

const getAllUser=catchAsyncError(async(req,res,next)=>{

    let apiFeatures = new ApiFeatures(userModel.find(),req.query).fields().search().sort().pagination().filter()
    let users = await apiFeatures.mongooseQuery

    !users && res.status(404).json({message:'user not found'})
    users && res.json({message:"success",page:apiFeatures.pageNumber,users})
})

const getSingleUser=catchAsyncError(async(req,res,next)=>{
    let user=await userModel.findById(req.params.id)
    !user && res.status(404).json({message:'user not found'})
    user && res.json({message:"success",user})
})

const updateUser=catchAsyncError(async(req,res,next)=>{
    
    let user=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !user && res.status(404).json({message:'user not found'})
    user && res.json({message:"success",user})
})

const deleteUser=deleteOne(userModel)

export {
    addUser,getAllUser,getSingleUser,updateUser,deleteUser
}