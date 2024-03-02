import { catchAsyncError } from "../../middleware/catchError.js"
import { cartModel } from "../../../database/models/cart.model.js"
import {productModel} from '../../../database/models/product.model.js'
import { couponModel } from '../../../database/models/coupon.model.js'
import { AppError } from "../../utils/AppError.js"

const calcTotalPrice =(cart)=>{
    let totalPrice=0
    cart.cartItems.forEach((item)=>{
        totalPrice += item.quantity * item.price
    })
    cart.totalPrice=totalPrice

    if(cart.discount){
        let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100
        cart.totalPriceAfterDiscount=totalPriceAfterDiscount
    }
}

const addToCart=catchAsyncError(async(req,res,next)=>{
    let product = await productModel.findById(req.body.product)
    if(!product) return next(new AppError('product not found',404))
    if(req.body.quantity>product.quantity) return next(new AppError('sold out',404))
    req.body.price=product.price

    // req.body.totalPrice=(product.price*req.body.quantity)
    let existCart=await cartModel.findOne({user:req.user._id})//check if he had cart 
    if(!existCart){
        let cart =await cartModel({
            user:req.user._id,
            cartItems:[req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        !cart && res.status(404).json({message:'cart not found'})
        cart && res.json({message:"success",cart})
    } else {

        let item= existCart.cartItems.find((item)=>item.product==req.body.product)
        if(item) {
            if(item.quantity>=req.body.quantity)return next(new AppError('sold out',404))
            item.quantity+=req.body.quantity  || 1            
        }
        else existCart.cartItems.push(req.body)
        calcTotalPrice(existCart)
        await existCart.save()

        res.json({message:"added to cart",cart:existCart})
    }
})

const removeItemFromCart=catchAsyncError(async(req,res,next)=>{
    let cart =await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cart:{_id:req.params.id}}},{new:true})
    calcTotalPrice(cart)
        await cart.save()
    !cart && res.status(404).json({message:'cart not found'})
    cart && res.json({message:"success",cart})
    //pop => remove last element
    //pull => remove on e you select from array
})

const updateQTY=catchAsyncError(async(req,res,next)=>{
    let cart =await cartModel.findOne({user:req.user._id})
    !cart && res.status(404).json({message:'cart not found'})
    let item= cart.cartItems.find((item)=>item.id==req.params.id)
    if(!item)  return next(new AppError('item not found',404))
    item.quantity=req.body.quantity            
    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({message:"success",cart})
    //pop => remove last element
    //pull => remove on e you select from array
})

const getLoggedUserCart=catchAsyncError(async(req,res,next)=>{
    let cart =await cartModel.findOne({user:req.user._id}).populate('cartItems.product')
    !cart && res.status(404).json({message:'cart not found'})
    cart && res.json({message:"success",cart})
})

const clearUserCart=catchAsyncError(async(req,res,next)=>{
    let cart =await cartModel.findOneAndDelete({user:req.user._id})
    !cart && res.status(404).json({message:'cart not found'})
    cart && res.json({message:"success",cart})
})

const applyCoupon=catchAsyncError(async(req,res,next)=>{
    let coupon= await couponModel.findOne({code:req.body.coupon,expires:{$gte:Date.now()}})
    if(!coupon)  return next(new AppError('coupon invalid',401))
    let cart =await cartModel.findOne({user:req.user._id})
    if(!cart)  return next(new AppError('cart not found',404))
    cart.discount=cart.discount
    calcTotalPrice(cart)
await cart.save()
res.json({message:"success",cart})

})

export {
    addToCart,
    removeItemFromCart,
    updateQTY,
    getLoggedUserCart,
    clearUserCart,
    applyCoupon
}