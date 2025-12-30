import { validation } from "../../middleware/validation.js";
import express from 'express'
import { addCartVal, paramsIdVal, updateQTYVal } from "./cart.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQTY } from "./cart.controller.js" 

const cartRouter=express.Router()

/**
 * @swagger
 * /api/v1/carts:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID to add to cart
 *               quantity:
 *                 type: number
 *                 default: 1
 *                 description: Quantity of the product
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
cartRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),validation(addCartVal),addToCart)//
.get(protectedRoutes,allowedTo('user'),getLoggedUserCart)

/**
 * @swagger
 * /api/v1/carts/applyCoupon:
 *   post:
 *     summary: Apply coupon to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: Coupon code to apply
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid or expired coupon
 *       401:
 *         description: Unauthorized
 */
cartRouter 
.post('/applyCoupon',protectedRoutes,allowedTo('user'),applyCoupon)

/**
 * @swagger
 * /api/v1/carts/{id}:
 *   delete:
 *     summary: Remove item from cart or clear entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove or 'clear' to clear entire cart
 *     responses:
 *       200:
 *         description: Item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart or item not found
 *   put:
 *     summary: Update item quantity in cart
 *     tags: [Cart]
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 description: New quantity for the product
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
cartRouter 
.route('/:id') 
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeItemFromCart)
.put(protectedRoutes,allowedTo('user'),validation(updateQTYVal),updateQTY)

/**
 * @swagger
 * /api/v1/carts/clear:
 *   delete:
 *     summary: Clear entire user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
cartRouter.delete('/clear',protectedRoutes,allowedTo('user'),clearUserCart)

export default cartRouter