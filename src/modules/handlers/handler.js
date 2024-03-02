import { catchAsyncError } from "../../middleware/catchError.js"

export const deleteOne=(model)=>{

    return catchAsyncError(async(req,res,next)=>{
        let document=await model.findByIdAndDelete(req.params.id)
        !document && res.status(404).json({message:'document not found'})
        document && res.json({message:"success",document})
    })

}