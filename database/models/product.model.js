import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true,"title is required"],
        trim: true,
        required: true,
        minLength:[2,"too short product title"],
        maxLength:[200,"too long product title"]

    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    description:{
        type:String,
        unique:[true,"description is required"],
        trim: true,
        required: true,
        minLength:[2,"too short product description"],
        maxLength:[200,"too long product description"]
    },
    imgCover:String,
    images:[],
    price:{
        type:Number,
        required:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    sold:Number,
    rateAvg:{
        type:Number,
        min:0,
        max:5
    },
    rateCount:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subcategory:{
        type:mongoose.Types.ObjectId,
        ref:'subcategory'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },      


},{timestamps: true,toJSON:{virtuals:true}})   

schema.post('init',function(doc){

    if(doc.imgCover || doc.images){
        doc.imgCover= process.env.baseURL+"uploads/"+ doc.imgCover //مش راضيه تشتغل
        doc.images=doc.images?.map( (img)=> process.env.baseURL + "uploads/" + img )
    }
})//عشان يظهرلي اللينك واضغط عليه يوديني للصوره

schema.virtual('myReviews',{
    ref:'review',
    localField:'_id',
    foreignField:'product',
    justOne:true
})//to show all reviews with product i get

schema.pre('findOne',function(){
    this.populate('myReviews')
})// to show the name of person who commented


export const productModel= mongoose.model('product',schema)