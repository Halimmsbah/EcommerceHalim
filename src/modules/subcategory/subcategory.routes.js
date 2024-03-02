import { validation } from "../../middleware/validation.js";
import { addSubCategory, deleteSubCategory, getAllSubCategory, getSingleSubCategory, updateSubCategory } from "./subcategory.controller.js";
import express from 'express'
import { addSubCategoryVal, paramsIdVal, updateSubCategoryVal } from "./subcategory.validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";


const subCategoryRouter=express.Router({mergeParams:true})//كدا الاتنين هيبقوا شايفين الاي دي اللي بينهم

subCategoryRouter
.route('/')
.post(protectedRoutes,validation(addSubCategoryVal),addSubCategory)//
.get(getAllSubCategory)

subCategoryRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleSubCategory)
.put(protectedRoutes,validation(updateSubCategoryVal),updateSubCategory)
.delete(protectedRoutes,validation(paramsIdVal),deleteSubCategory)

export default subCategoryRouter