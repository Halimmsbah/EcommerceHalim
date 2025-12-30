# E-Commerce API Swagger Documentation

## Overview
This project now includes comprehensive API documentation using Swagger/OpenAPI 3.0. The documentation provides interactive API testing capabilities and detailed endpoint descriptions.

## 🚀 Quick Start

### Prerequisites
- Node.js v20+ installed
- MongoDB running
- All npm dependencies installed

### Installation
The Swagger dependencies have been added to the project:
```bash
npm install swagger-ui-express swagger-jsdoc
```

### Running the Server
```bash
npm start
```

The server will start on port 4000 (or the PORT specified in your environment variables).

## 📚 Accessing Documentation

### Main API Home
Visit: http://localhost:4000
- Shows a welcome page with all available endpoints
- Provides a direct link to the Swagger documentation

### Swagger UI Documentation
Visit: http://localhost:4000/api-docs
- Interactive API documentation
- Test endpoints directly from the browser
- View request/response schemas
- Authentication support

## 🔧 Configuration Files

### swagger.config.js
Main Swagger configuration file that:
- Sets up OpenAPI 3.0 specifications
- Defines server URLs
- Configures security schemes (Bearer JWT)
- Specifies file paths for API documentation

### swagger.schemas.js
Contains all data model schemas including:
- User, Category, SubCategory, Brand schemas
- Product, Cart, Order schemas
- Review, Coupon schemas
- Request/Response models
- Error handling schemas

## 📖 Documented Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login
- `PATCH /api/v1/auth/changePassword` - Change password

### Categories
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category (Admin)
- `GET /api/v1/categories/{id}` - Get category by ID
- `PUT /api/v1/categories/{id}` - Update category (Admin)
- `DELETE /api/v1/categories/{id}` - Delete category (Admin)

### Products
- `GET /api/v1/products` - Get all products (with filtering, pagination, sorting)
- `POST /api/v1/products` - Create product (Admin)
- `GET /api/v1/products/{id}` - Get product by ID
- `PUT /api/v1/products/{id}` - Update product (Admin)
- `DELETE /api/v1/products/{id}` - Delete product (Admin)

### Shopping Cart
- `GET /api/v1/carts` - Get user's cart
- `POST /api/v1/carts` - Add product to cart
- `PUT /api/v1/carts/{id}` - Update item quantity
- `DELETE /api/v1/carts/{id}` - Remove item from cart
- `POST /api/v1/carts/applyCoupon` - Apply discount coupon

### Orders
- `GET /api/v1/orders` - Get user's orders
- `GET /api/v1/orders/all` - Get all orders (Admin)
- `POST /api/v1/orders/{id}` - Create cash order
- `POST /api/v1/orders/checkOut/{id}` - Create Stripe checkout session

### Users
- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create new user
- `GET /api/v1/users/{id}` - Get user by ID
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user

## 🔐 Authentication

The API uses JWT Bearer token authentication. To access protected endpoints:

1. Register or login to get a JWT token
2. In Swagger UI, click the "Authorize" button
3. Enter your token in the format: `Bearer <your-jwt-token>`
4. Now you can test protected endpoints

## 📝 Features

### Interactive Testing
- Test all endpoints directly from the Swagger UI
- Upload files for image endpoints
- View real-time responses
- Error handling examples

### Request/Response Examples
- Complete schema definitions
- Example payloads for all endpoints
- Error response formats
- Validation requirements

### Security
- JWT authentication documented
- Protected route indicators
- Role-based access control (User/Admin)

### File Uploads
- Product image uploads (cover image + gallery)
- Category/Brand logo uploads
- Multipart form data support

## 🛠 Development

### Adding New Endpoints
When adding new routes, include Swagger documentation:

```javascript
/**
 * @swagger
 * /api/v1/your-endpoint:
 *   post:
 *     summary: Endpoint description
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YourSchema'
 *     responses:
 *       200:
 *         description: Success response
 */
```

### Adding New Schemas
Add new data models to `swagger.schemas.js`:

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     YourModel:
 *       type: object
 *       required:
 *         - field1
 *         - field2
 *       properties:
 *         field1:
 *           type: string
 *           description: Field description
 */
```

## 🌐 Production Deployment

For production deployment:

1. Update server URLs in `swagger.config.js`
2. Set appropriate environment variables
3. Ensure proper CORS configuration
4. Consider API rate limiting
5. Add API versioning if needed

## 📋 Next Steps

Consider adding:
- [ ] API rate limiting documentation
- [ ] WebSocket endpoints (if any)
- [ ] Admin panel endpoints
- [ ] Webhook documentation
- [ ] API changelog/versioning
- [ ] Response time metrics
- [ ] API key authentication option

## 🆘 Troubleshooting

### Common Issues
1. **Swagger UI not loading**: Check if server is running on correct port
2. **Authentication failing**: Ensure JWT token is properly formatted with "Bearer " prefix
3. **File uploads not working**: Check multer configuration and file size limits
4. **Schema validation errors**: Verify request payload matches documented schema

### Support
- Check the console for any JavaScript errors
- Verify database connection
- Ensure all environment variables are set
- Check MongoDB connection string

---

**Happy API Testing! 🚀**