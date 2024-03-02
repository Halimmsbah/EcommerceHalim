import { validation } from "../../middleware/validation.js";
import { addBrand, deleteBrand, getAllBrand, getSingleBrand, updateBrand } from "./brand.controller.js";
import express from 'express'
import { addBrandVal, paramsIdVal, updateBrandVal } from "./Brand.validation.js";
import { uploadSingleFile } from "../../services/fileUpload/fileUpload.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const brandRouter=express.Router()

brandRouter

.route('/')
.post(protectedRoutes,uploadSingleFile('logo'),validation(addBrandVal),addBrand)//
.get(getAllBrand)

brandRouter

.route('/:id')
.get(validation(paramsIdVal),getSingleBrand)
.put(protectedRoutes,uploadSingleFile('logo'),validation(updateBrandVal),updateBrand)
.delete(protectedRoutes,validation(paramsIdVal),deleteBrand)

export default brandRouter