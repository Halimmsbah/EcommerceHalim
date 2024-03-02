import { validation } from "../../middleware/validation.js";
import { addCoupon, deleteCoupon, getAllCoupon, getSingleCoupon, updateCoupon } from "./coupon.controller.js";
import express from 'express'
import { addCouponVal, paramsIdVal, updateCouponVal } from "./coupon.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const couponRouter=express.Router()//كدا الاتنين هيبقوا شايفين الاي دي اللي بينهم

couponRouter.use(protectedRoutes,allowedTo('admin'))
.route('/')
.post(validation(addCouponVal),addCoupon)//
.get(getAllCoupon)

couponRouter
.route('/:id') 
.get(validation(paramsIdVal),getSingleCoupon)
.put(validation(updateCouponVal),updateCoupon)
.delete(validation(paramsIdVal),deleteCoupon)

export default couponRouter