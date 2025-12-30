import express from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { 
    getDashboardStats, 
    getRevenueAnalytics, 
    getTopSellingProducts, 
    getRecentOrders,
    getLowStockProducts,
    getOutOfStockProducts,
    getSalesByCategory,
    getUserGrowth
} from './dashboard.controller.js'

const dashboardRouter = express.Router()

// All dashboard routes require admin authentication
dashboardRouter.use(protectedRoutes, allowedTo('admin'))

/**
 * @swagger
 * /api/v1/dashboard/stats:
 *   get:
 *     summary: Get overall dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalProducts:
 *                       type: number
 *                     totalUsers:
 *                       type: number
 *                     totalOrders:
 *                       type: number
 *                     totalCategories:
 *                       type: number
 *                     totalBrands:
 *                       type: number
 *                     totalRevenue:
 *                       type: number
 *                     pendingOrders:
 *                       type: number
 *                     deliveredOrders:
 *                       type: number
 *                     paidOrders:
 *                       type: number
 *                     unpaidOrders:
 *                       type: number
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/stats', getDashboardStats)

/**
 * @swagger
 * /api/v1/dashboard/revenue:
 *   get:
 *     summary: Get revenue analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, monthly]
 *           default: monthly
 *         description: Period for revenue analytics
 *     responses:
 *       200:
 *         description: Revenue analytics retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/revenue', getRevenueAnalytics)

/**
 * @swagger
 * /api/v1/dashboard/top-products:
 *   get:
 *     summary: Get top selling products
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products to return
 *     responses:
 *       200:
 *         description: Top selling products retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/top-products', getTopSellingProducts)

/**
 * @swagger
 * /api/v1/dashboard/recent-orders:
 *   get:
 *     summary: Get recent orders
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders to return
 *     responses:
 *       200:
 *         description: Recent orders retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/recent-orders', getRecentOrders)

/**
 * @swagger
 * /api/v1/dashboard/low-stock:
 *   get:
 *     summary: Get low stock products
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Stock threshold
 *     responses:
 *       200:
 *         description: Low stock products retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/low-stock', getLowStockProducts)

/**
 * @swagger
 * /api/v1/dashboard/out-of-stock:
 *   get:
 *     summary: Get out of stock products
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Out of stock products retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/out-of-stock', getOutOfStockProducts)

/**
 * @swagger
 * /api/v1/dashboard/sales-by-category:
 *   get:
 *     summary: Get sales breakdown by category
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales by category retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/sales-by-category', getSalesByCategory)

/**
 * @swagger
 * /api/v1/dashboard/user-growth:
 *   get:
 *     summary: Get user growth analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User growth data retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
dashboardRouter.get('/user-growth', getUserGrowth)

export default dashboardRouter
