import { validation } from "../../middleware/validation.js";
import express from 'express'
import { addAddressVal, paramsIdVal, updateAddressVal } from "./address.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {addToAddress, getLoggedUserAddress, removeFromAddress } from "./address.controller.js" 

const addressRouter=express.Router()//كدا الاتنين هيبقوا شايفين الاي دي اللي بينهم

addressRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addAddressVal),addToAddress)//
.get(protectedRoutes,allowedTo('user'),getLoggedUserAddress)

addressRouter 
.route('/:id') 
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeFromAddress)

export default addressRouter