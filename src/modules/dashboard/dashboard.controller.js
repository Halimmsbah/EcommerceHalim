import { catchAsyncError } from "../../middleware/catchError.js"
import { orderModel } from "../../../database/models/order.model.js"
import { productModel } from "../../../database/models/product.model.js"
import { userModel } from "../../../database/models/user.model.js"
import { categoryModel } from "../../../database/models/category.model.js"
import { brandModel } from "../../../database/models/brand.model.js"

// Get dashboard statistics
const getDashboardStats = catchAsyncError(async (req, res, next) => {
    // Get total counts
    const totalProducts = await productModel.countDocuments()
    const totalUsers = await userModel.countDocuments()
    const totalOrders = await orderModel.countDocuments()
    const totalCategories = await categoryModel.countDocuments()
    const totalBrands = await brandModel.countDocuments()

    // Get total revenue (only paid orders)
    const revenueResult = await orderModel.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalOrderPrice' } } }
    ])
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0

    // Get pending orders count
    const pendingOrders = await orderModel.countDocuments({ isDelivered: false })
    
    // Get delivered orders count
    const deliveredOrders = await orderModel.countDocuments({ isDelivered: true })

    // Get paid vs unpaid orders
    const paidOrders = await orderModel.countDocuments({ isPaid: true })
    const unpaidOrders = await orderModel.countDocuments({ isPaid: false })

    res.json({
        message: "success",
        stats: {
            totalProducts,
            totalUsers,
            totalOrders,
            totalCategories,
            totalBrands,
            totalRevenue,
            pendingOrders,
            deliveredOrders,
            paidOrders,
            unpaidOrders
        }
    })
})

// Get revenue analytics (daily/monthly)
const getRevenueAnalytics = catchAsyncError(async (req, res, next) => {
    const { period = 'monthly' } = req.query // 'daily' or 'monthly'
    
    let groupBy
    if (period === 'daily') {
        groupBy = {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
        }
    } else {
        groupBy = {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
        }
    }

    const revenueData = await orderModel.aggregate([
        { $match: { isPaid: true } },
        {
            $group: {
                _id: groupBy,
                totalRevenue: { $sum: '$totalOrderPrice' },
                orderCount: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
        { $limit: 12 }
    ])

    res.json({
        message: "success",
        period,
        data: revenueData
    })
})

// Get top selling products
const getTopSellingProducts = catchAsyncError(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 10

    const topProducts = await productModel.find()
        .sort({ sold: -1 })
        .limit(limit)
        .select('title sold price imgCover category brand')
        .populate('category', 'name')
        .populate('brand', 'name')

    res.json({
        message: "success",
        products: topProducts
    })
})

// Get recent orders
const getRecentOrders = catchAsyncError(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 10

    const recentOrders = await orderModel.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('user', 'name email')
        .populate('orderItems.product', 'title price')

    res.json({
        message: "success",
        orders: recentOrders
    })
})

// Get low stock products
const getLowStockProducts = catchAsyncError(async (req, res, next) => {
    const threshold = parseInt(req.query.threshold) || 10

    const lowStockProducts = await productModel.find({ quantity: { $lte: threshold, $gt: 0 } })
        .sort({ quantity: 1 })
        .select('title quantity price imgCover')

    res.json({
        message: "success",
        count: lowStockProducts.length,
        products: lowStockProducts
    })
})

// Get out of stock products
const getOutOfStockProducts = catchAsyncError(async (req, res, next) => {
    const outOfStockProducts = await productModel.find({ quantity: 0 })
        .select('title quantity price imgCover')

    res.json({
        message: "success",
        count: outOfStockProducts.length,
        products: outOfStockProducts
    })
})

// Get sales by category
const getSalesByCategory = catchAsyncError(async (req, res, next) => {
    const salesData = await orderModel.aggregate([
        { $unwind: '$orderItems' },
        {
            $lookup: {
                from: 'products',
                localField: 'orderItems.product',
                foreignField: '_id',
                as: 'productInfo'
            }
        },
        { $unwind: '$productInfo' },
        {
            $lookup: {
                from: 'categories',
                localField: 'productInfo.category',
                foreignField: '_id',
                as: 'categoryInfo'
            }
        },
        { $unwind: '$categoryInfo' },
        {
            $group: {
                _id: '$categoryInfo._id',
                categoryName: { $first: '$categoryInfo.name' },
                totalSales: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } },
                totalQuantity: { $sum: '$orderItems.quantity' }
            }
        },
        { $sort: { totalSales: -1 } }
    ])

    res.json({
        message: "success",
        data: salesData
    })
})

// Get user growth analytics
const getUserGrowth = catchAsyncError(async (req, res, next) => {
    const userGrowth = await userModel.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 }
    ])

    res.json({
        message: "success",
        data: userGrowth
    })
})

export {
    getDashboardStats,
    getRevenueAnalytics,
    getTopSellingProducts,
    getRecentOrders,
    getLowStockProducts,
    getOutOfStockProducts,
    getSalesByCategory,
    getUserGrowth
}
