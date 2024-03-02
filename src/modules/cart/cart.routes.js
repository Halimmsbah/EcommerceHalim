import { validation } from "../../middleware/validation.js";
import express from 'express'
import { addCartVal, paramsIdVal, updateQTYVal } from "./cart.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQTY } from "./cart.controller.js" 

const cartRouter=express.Router()

cartRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),validation(addCartVal),addToCart)//
.get(protectedRoutes,allowedTo('user'),getLoggedUserCart)

cartRouter 
.post('/applyCoupon',protectedRoutes,allowedTo('user'),applyCoupon)

cartRouter 
.route('/:id') 
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeItemFromCart)
.delete(protectedRoutes,allowedTo('user'),validation(paramsIdVal),clearUserCart)
.put(protectedRoutes,allowedTo('user'),validation(updateQTYVal),updateQTY)


export default cartRouter