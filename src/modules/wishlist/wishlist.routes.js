import { validation } from "../../middleware/validation.js";
import express from 'express'
import { addWishlistVal, paramsIdVal, updateWishlistVal } from "./wishlist.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {addToWishlist, getLoggedUserWishlist, removeFromWishlist} from "./wishlist.controller.js" 

const wishlistRouter=express.Router()//كدا الاتنين هيبقوا شايفين الاي دي اللي بينهم

wishlistRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addWishlistVal),addToWishlist)//
.get(protectedRoutes,allowedTo('user'),getLoggedUserWishlist)

wishlistRouter
.route('/:id') 
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeFromWishlist)

export default wishlistRouter