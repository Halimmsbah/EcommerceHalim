import { validation } from "../../middleware/validation.js";
import express from 'express'
import { addOrderVal } from "./order.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { 
    createCashOrder, 
    createCheckOutSession, 
    getAllOrders, 
    getSpecififcOrder,
    updateOrderDeliveryStatus,
    updateOrderPaymentStatus,
    getOrdersWithFilters,
    deleteOrder
} from "./order.controller.js";

const orderRouter=express.Router()

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get logged user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
orderRouter
.route('/')
.get(protectedRoutes,allowedTo('user'),getSpecififcOrder)

/**
 * @swagger
 * /api/v1/orders/all:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: List of all orders
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
 *                     $ref: '#/components/schemas/Order'
 *                 metadata:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
orderRouter
.get('/all',getAllOrders)

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   post:
 *     summary: Create cash order from cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID to create order from
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - street
 *                   - city
 *                   - phone
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Street address
 *                   city:
 *                     type: string
 *                     description: City
 *                   phone:
 *                     type: string
 *                     description: Phone number
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - cart not found or empty
 *       401:
 *         description: Unauthorized
 */
orderRouter 
.route('/:id') 
.post(protectedRoutes,allowedTo('user'),validation(addOrderVal),createCashOrder)

/**
 * @swagger
 * /api/v1/orders/checkOut/{id}:
 *   post:
 *     summary: Create Stripe checkout session for online payment
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID to create checkout session from
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - street
 *                   - city
 *                   - phone
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   phone:
 *                     type: string
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: Stripe checkout URL
 *                     id:
 *                       type: string
 *                       description: Session ID
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
orderRouter 
.post('/checkOut/:id',protectedRoutes,allowedTo('user'),createCheckOutSession)

/**
 * @swagger
 * /api/v1/orders/admin/filters:
 *   get:
 *     summary: Get orders with filters (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [delivered, pending]
 *         description: Filter by delivery status
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [paid, unpaid]
 *         description: Filter by payment status
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter
 *     responses:
 *       200:
 *         description: Filtered orders retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
orderRouter.get('/admin/filters', protectedRoutes, allowedTo('admin'), getOrdersWithFilters)

/**
 * @swagger
 * /api/v1/orders/admin/{orderId}/delivery:
 *   patch:
 *     summary: Update order delivery status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isDelivered
 *             properties:
 *               isDelivered:
 *                 type: boolean
 *                 description: Delivery status
 *     responses:
 *       200:
 *         description: Order delivery status updated successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Order not found
 */
orderRouter.patch('/admin/:orderId/delivery', protectedRoutes, allowedTo('admin'), updateOrderDeliveryStatus)

/**
 * @swagger
 * /api/v1/orders/admin/{orderId}/payment:
 *   patch:
 *     summary: Update order payment status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isPaid
 *             properties:
 *               isPaid:
 *                 type: boolean
 *                 description: Payment status
 *     responses:
 *       200:
 *         description: Order payment status updated successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Order not found
 */
orderRouter.patch('/admin/:orderId/payment', protectedRoutes, allowedTo('admin'), updateOrderPaymentStatus)

/**
 * @swagger
 * /api/v1/orders/admin/{orderId}:
 *   delete:
 *     summary: Delete order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Order not found
 */
orderRouter.delete('/admin/:orderId', protectedRoutes, allowedTo('admin'), deleteOrder)

export default orderRouter