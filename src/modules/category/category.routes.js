import { validation } from "../../middleware/validation.js";
import { addCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "./category.controller.js";
import express from 'express'
import { addCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUpload/fileUpload.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter=express.Router()

categoryRouter.use('/category/subCategories',subCategoryRouter)

categoryRouter

.route('/')
.post(protectedRoutes,allowedTo('user','admin'),uploadSingleFile('img'),validation(addCategoryVal),addCategory)//
.get(getAllCategory)

categoryRouter

.route('/:id')
.get(validation(paramsIdVal),getSingleCategory)
.put(protectedRoutes,uploadSingleFile('img'),validation(updateCategoryVal),updateCategory)
.delete(protectedRoutes,validation(paramsIdVal),deleteCategory)

export default categoryRouter