import { validation } from "../../middleware/validation.js";
import express from 'express'
import { addOrderVal } from "./order.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckOutSession, getAllOrders, getSpecififcOrder } from "./order.controller.js";

const orderRouter=express.Router()

orderRouter
.route('/')
.get(protectedRoutes,allowedTo('user'),getSpecififcOrder)

orderRouter
.get('/all',getAllOrders)


orderRouter 
.route('/:id') 
.post(protectedRoutes,allowedTo('user'),validation(addOrderVal),createCashOrder)

orderRouter 
.post('/checkOut/:id',protectedRoutes,allowedTo('user'),createCheckOutSession)


export default orderRouter