import dotenv  from "dotenv"
import { globalError } from "../middleware/globalError.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import productRouter from "./product/product.routes.js"
import subcategoryRouter from "./subcategory/subcategory.routes.js"
import userRouter from "./user/user.routes.js"
import reviewRouter from "./review/review.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"
import addressRouter from "./address/address.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import cartRouter from "./cart/cart.routes.js"
import orderRouter from "./order/order.routes.js"
import dashboardRouter from "./dashboard/dashboard.routes.js"

export const bootstrap=(app)=>{
    dotenv.config()
    
    app.get('/', (req, res) => res.send(`
        <h1>E-Commerce API</h1>
        <p>Welcome to the E-Commerce API</p>
        <p><a href="/api-docs">📚 View API Documentation</a></p>
        <p>Available endpoints:</p>
        <ul>
            <li>🔐 <strong>/api/v1/auth</strong> - Authentication (signin, signup, change password)</li>
            <li>📂 <strong>/api/v1/categories</strong> - Categories management</li>
            <li>📂 <strong>/api/v1/subCategories</strong> - Subcategories management</li>
            <li>🏷️ <strong>/api/v1/brands</strong> - Brands management</li>
            <li>📦 <strong>/api/v1/products</strong> - Products management</li>
            <li>👥 <strong>/api/v1/users</strong> - Users management</li>
            <li>⭐ <strong>/api/v1/reviews</strong> - Product reviews</li>
            <li>❤️ <strong>/api/v1/wishlist</strong> - User wishlist</li>
            <li>📍 <strong>/api/v1/addresses</strong> - User addresses</li>
            <li>🎟️ <strong>/api/v1/coupons</strong> - Discount coupons</li>
            <li>🛒 <strong>/api/v1/carts</strong> - Shopping cart</li>
            <li>📋 <strong>/api/v1/orders</strong> - Order management</li>
            <li>📊 <strong>/api/v1/dashboard</strong> - Admin dashboard & statistics</li>
        </ul>
    `))
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subCategories',subcategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/reviews',reviewRouter)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/addresses',addressRouter)   
    app.use('/api/v1/coupons',couponRouter)   
    app.use('/api/v1/carts',cartRouter)    
    app.use('/api/v1/orders',orderRouter)
    app.use('/api/v1/dashboard',dashboardRouter)    
    
    app.use(globalError)
}