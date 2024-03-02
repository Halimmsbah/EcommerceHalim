import { validation } from "../../middleware/validation.js";
import { addProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "./product.controller.js";
import express from 'express'
import { addProductVal, paramsIdVal, updateProductVal } from "./product.validation.js";
import { uploadFields } from "../../services/fileUpload/fileUpload.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const productRouter=express.Router()

productRouter

.route('/')
.post(protectedRoutes,uploadFields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10},

]),validation(addProductVal),addProduct)//
.get(getAllProduct)

productRouter

.route('/:id')
.get(validation(paramsIdVal),getSingleProduct)
.put(protectedRoutes,uploadFields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10},

]),validation(updateProductVal),updateProduct)
.delete(protectedRoutes,validation(paramsIdVal),deleteProduct)

export default productRouter