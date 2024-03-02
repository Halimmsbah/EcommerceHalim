import { validation } from "../../middleware/validation.js";
import { addReview, deleteReview, getAllReview, getSingleReview, updateReview } from "./review.controller.js";
import express from 'express'
import { addReviewVal, paramsIdVal, updateReviewVal } from "./review.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const reviewRouter=express.Router()//كدا الاتنين هيبقوا شايفين الاي دي اللي بينهم

reviewRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),validation(addReviewVal),addReview)//
.get(getAllReview)

reviewRouter
.route('/:id') 
.get(validation(paramsIdVal),getSingleReview)
.put(protectedRoutes,allowedTo('user'),validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),deleteReview)

export default reviewRouter