/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the user account is active
 *         isBlocked:
 *           type: boolean
 *           default: false
 *           description: Whether the user account is blocked
 *         confirmEmail:
 *           type: boolean
 *           default: false
 *           description: Whether the user's email is confirmed
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: User role
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "John Doe"
 *         email: "john@example.com"
 *         isActive: true
 *         isBlocked: false
 *         confirmEmail: true
 *         role: "user"
 * 
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: Category name
 *         slug:
 *           type: string
 *           description: URL-friendly version of the name
 *         image:
 *           type: string
 *           description: Category image path
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this category
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "Electronics"
 *         slug: "electronics"
 *         image: "electronics.png"
 * 
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           description: Subcategory name
 *         slug:
 *           type: string
 *           description: URL-friendly version of the name
 *         image:
 *           type: string
 *           description: Subcategory image path
 *         category:
 *           type: string
 *           description: Parent category ID
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this subcategory
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           description: Brand name
 *         slug:
 *           type: string
 *           description: URL-friendly version of the name
 *         logo:
 *           type: string
 *           description: Brand logo path
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this brand
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - category
 *         - subcategory
 *         - brand
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           description: Product title
 *         slug:
 *           type: string
 *           description: URL-friendly version of the title
 *         description:
 *           type: string
 *           description: Product description
 *         imageCover:
 *           type: string
 *           description: Main product image
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Additional product images
 *         price:
 *           type: number
 *           description: Product price
 *         priceAfterDiscount:
 *           type: number
 *           description: Discounted price
 *         sold:
 *           type: number
 *           default: 0
 *           description: Number of units sold
 *         stock:
 *           type: number
 *           default: 0
 *           description: Available stock
 *         category:
 *           type: string
 *           description: Category ID
 *         subcategory:
 *           type: string
 *           description: Subcategory ID
 *         brand:
 *           type: string
 *           description: Brand ID
 *         rateAvg:
 *           type: number
 *           default: 0
 *           description: Average rating
 *         rateCount:
 *           type: number
 *           default: 0
 *           description: Number of ratings
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this product
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           description: User ID
 *         cartItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *               price:
 *                 type: number
 *                 description: Price per unit
 *         totalCartPrice:
 *           type: number
 *           description: Total price of all items in cart
 *         totalCartPriceAfterDiscount:
 *           type: number
 *           description: Total price after applying discount
 *         discount:
 *           type: number
 *           description: Discount amount
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           description: User ID
 *         orderItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *         totalOrderPrice:
 *           type: number
 *           description: Total order amount
 *         shippingAddress:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             phone:
 *               type: string
 *         paymentMethod:
 *           type: string
 *           enum: [card, cash]
 *           default: cash
 *         isPaid:
 *           type: boolean
 *           default: false
 *         paidAt:
 *           type: string
 *           format: date-time
 *         isDelivered:
 *           type: boolean
 *           default: false
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Review:
 *       type: object
 *       required:
 *         - comment
 *         - rate
 *         - user
 *         - product
 *       properties:
 *         _id:
 *           type: string
 *         comment:
 *           type: string
 *           description: Review comment
 *         rate:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating from 1 to 5
 *         user:
 *           type: string
 *           description: User ID who wrote the review
 *         product:
 *           type: string
 *           description: Product ID being reviewed
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Coupon:
 *       type: object
 *       required:
 *         - code
 *         - discount
 *         - expires
 *       properties:
 *         _id:
 *           type: string
 *         code:
 *           type: string
 *           description: Coupon code
 *         discount:
 *           type: number
 *           description: Discount percentage or amount
 *         expires:
 *           type: string
 *           format: date-time
 *           description: Expiration date
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this coupon
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         error:
 *           type: string
 *           description: Error details
 *         stack:
 *           type: string
 *           description: Error stack trace
 * 
 *     Success:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         data:
 *           type: object
 *           description: Response data
 * 
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         page:
 *           type: number
 *           description: Current page number
 *         limit:
 *           type: number
 *           description: Items per page
 *         totalPages:
 *           type: number
 *           description: Total number of pages
 *         totalResults:
 *           type: number
 *           description: Total number of items
 * 
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         email: "user@example.com"
 *         password: "password123"
 * 
 *     SignupRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         password:
 *           type: string
 *           minLength: 6
 *           description: User's password
 *       example:
 *         name: "John Doe"
 *         email: "john@example.com"
 *         password: "password123"
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         token:
 *           type: string
 *           description: JWT authentication token
 *         user:
 *           $ref: '#/components/schemas/User'
 *       example:
 *         message: "Login successful"
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           _id: "507f1f77bcf86cd799439011"
 *           name: "John Doe"
 *           email: "john@example.com"
 */