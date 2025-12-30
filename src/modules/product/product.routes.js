import { validation } from "../../middleware/validation.js";
import { addProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "./product.controller.js";
import express from 'express'
import { addProductVal, paramsIdVal, updateProductVal } from "./product.validation.js";
import { uploadFields } from "../../services/fileUpload/fileUpload.js";
import { IsAdmin, protectedRoutes } from "../auth/auth.controller.js";

const productRouter=express.Router()

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *               - subcategory
 *               - brand
 *             properties:
 *               title:
 *                 type: string
 *                 description: Product title
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               priceAfterDiscount:
 *                 type: number
 *                 description: Discounted price
 *               stock:
 *                 type: number
 *                 description: Available stock
 *               category:
 *                 type: string
 *                 description: Category ID
 *               subcategory:
 *                 type: string
 *                 description: Subcategory ID
 *               brand:
 *                 type: string
 *                 description: Brand ID
 *               imgCover:
 *                 type: string
 *                 format: binary
 *                 description: Main product image
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Additional product images (max 10)
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand ID
 *       - in: query
 *         name: priceGte
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: priceLte
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, -price, createdAt, -createdAt, rateAvg, -rateAvg]
 *         description: Sort products
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in product title and description
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: number
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 metadata:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */
productRouter
.route('/')
.post(protectedRoutes,IsAdmin,uploadFields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10},

]),validation(addProductVal),addProduct)//
.get(getAllProduct)

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               priceAfterDiscount:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               brand:
 *                 type: string
 *               imgCover:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
productRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleProduct)
.put(protectedRoutes,uploadFields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10},

]),validation(updateProductVal),updateProduct)
.delete(protectedRoutes,validation(paramsIdVal),deleteProduct)

export default productRouter