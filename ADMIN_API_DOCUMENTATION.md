# Admin Dashboard API Documentation

## Overview
This document provides detailed information about the admin dashboard API endpoints for managing the e-commerce platform.

## Authentication
All admin endpoints require:
- Valid JWT token in the `token` header
- User role must be `admin`

### Getting Admin Token
```json
POST /api/v1/auth/signin
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```

Response:
```json
{
  "message": "Signed in successfully",
  "token": "your-jwt-token-here"
}
```

Use this token in all subsequent requests:
```
Headers: { "token": "your-jwt-token-here" }
```

---

## Dashboard Statistics Endpoints

### 1. Get Overall Dashboard Statistics
Get comprehensive statistics for the admin dashboard.

**Endpoint:** `GET /api/v1/dashboard/stats`

**Response:**
```json
{
  "message": "success",
  "stats": {
    "totalProducts": 150,
    "totalUsers": 1200,
    "totalOrders": 450,
    "totalCategories": 12,
    "totalBrands": 25,
    "totalRevenue": 125000,
    "pendingOrders": 35,
    "deliveredOrders": 415,
    "paidOrders": 430,
    "unpaidOrders": 20
  }
}
```

### 2. Get Revenue Analytics
Get revenue breakdown by period (daily or monthly).

**Endpoint:** `GET /api/v1/dashboard/revenue?period=monthly`

**Query Parameters:**
- `period` (optional): `daily` or `monthly` (default: `monthly`)

**Response:**
```json
{
  "message": "success",
  "period": "monthly",
  "data": [
    {
      "_id": { "year": 2025, "month": 12 },
      "totalRevenue": 45000,
      "orderCount": 120
    },
    {
      "_id": { "year": 2025, "month": 11 },
      "totalRevenue": 38000,
      "orderCount": 95
    }
  ]
}
```

### 3. Get Top Selling Products
Get the best-performing products by sales.

**Endpoint:** `GET /api/v1/dashboard/top-products?limit=10`

**Query Parameters:**
- `limit` (optional): Number of products to return (default: 10)

**Response:**
```json
{
  "message": "success",
  "products": [
    {
      "_id": "product123",
      "title": "Product Name",
      "sold": 150,
      "price": 299,
      "imgCover": "http://localhost:4000/uploads/product.jpg",
      "category": { "_id": "cat123", "name": "Electronics" },
      "brand": { "_id": "brand123", "name": "Brand Name" }
    }
  ]
}
```

### 4. Get Recent Orders
Get the most recent orders placed on the platform.

**Endpoint:** `GET /api/v1/dashboard/recent-orders?limit=10`

**Query Parameters:**
- `limit` (optional): Number of orders to return (default: 10)

**Response:**
```json
{
  "message": "success",
  "orders": [
    {
      "_id": "order123",
      "user": {
        "_id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "orderItems": [
        {
          "product": {
            "_id": "prod123",
            "title": "Product Name",
            "price": 299
          },
          "quantity": 2,
          "price": 299
        }
      ],
      "totalOrderPrice": 598,
      "isDelivered": false,
      "isPaid": true,
      "createdAt": "2025-12-30T10:00:00.000Z"
    }
  ]
}
```

### 5. Get Low Stock Products
Get products with stock below threshold.

**Endpoint:** `GET /api/v1/dashboard/low-stock?threshold=10`

**Query Parameters:**
- `threshold` (optional): Stock threshold (default: 10)

**Response:**
```json
{
  "message": "success",
  "count": 5,
  "products": [
    {
      "_id": "prod123",
      "title": "Product Name",
      "quantity": 5,
      "price": 299,
      "imgCover": "http://localhost:4000/uploads/product.jpg"
    }
  ]
}
```

### 6. Get Out of Stock Products
Get products that are completely out of stock.

**Endpoint:** `GET /api/v1/dashboard/out-of-stock`

**Response:**
```json
{
  "message": "success",
  "count": 3,
  "products": [
    {
      "_id": "prod456",
      "title": "Product Name",
      "quantity": 0,
      "price": 299,
      "imgCover": "http://localhost:4000/uploads/product.jpg"
    }
  ]
}
```

### 7. Get Sales by Category
Get sales breakdown by product categories.

**Endpoint:** `GET /api/v1/dashboard/sales-by-category`

**Response:**
```json
{
  "message": "success",
  "data": [
    {
      "_id": "cat123",
      "categoryName": "Electronics",
      "totalSales": 125000,
      "totalQuantity": 450
    },
    {
      "_id": "cat456",
      "categoryName": "Clothing",
      "totalSales": 85000,
      "totalQuantity": 320
    }
  ]
}
```

### 8. Get User Growth Analytics
Get user registration trends over time.

**Endpoint:** `GET /api/v1/dashboard/user-growth`

**Response:**
```json
{
  "message": "success",
  "data": [
    {
      "_id": { "year": 2025, "month": 12 },
      "count": 150
    },
    {
      "_id": { "year": 2025, "month": 11 },
      "count": 120
    }
  ]
}
```

---

## Order Management Endpoints

### 9. Get Orders with Filters
Filter orders by various criteria.

**Endpoint:** `GET /api/v1/orders/admin/filters`

**Query Parameters:**
- `status` (optional): `delivered` or `pending`
- `paymentStatus` (optional): `paid` or `unpaid`
- `userId` (optional): Filter by specific user ID
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)

**Example:**
```
GET /api/v1/orders/admin/filters?status=pending&paymentStatus=paid
```

**Response:**
```json
{
  "message": "success",
  "count": 15,
  "orders": [
    {
      "_id": "order123",
      "user": {
        "_id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "orderItems": [...],
      "totalOrderPrice": 598,
      "isDelivered": false,
      "isPaid": true,
      "paymentType": "card",
      "createdAt": "2025-12-30T10:00:00.000Z"
    }
  ]
}
```

### 10. Update Order Delivery Status
Mark an order as delivered or pending.

**Endpoint:** `PATCH /api/v1/orders/admin/:orderId/delivery`

**Request Body:**
```json
{
  "isDelivered": true
}
```

**Response:**
```json
{
  "message": "success",
  "order": {
    "_id": "order123",
    "isDelivered": true,
    "deliveredAt": "2025-12-30T15:30:00.000Z",
    ...
  }
}
```

### 11. Update Order Payment Status
Mark an order as paid or unpaid.

**Endpoint:** `PATCH /api/v1/orders/admin/:orderId/payment`

**Request Body:**
```json
{
  "isPaid": true
}
```

**Response:**
```json
{
  "message": "success",
  "order": {
    "_id": "order123",
    "isPaid": true,
    "paidAt": "2025-12-30T15:30:00.000Z",
    ...
  }
}
```

### 12. Delete Order
Delete an order from the system (admin only).

**Endpoint:** `DELETE /api/v1/orders/admin/:orderId`

**Response:**
```json
{
  "message": "Order deleted successfully",
  "order": {
    "_id": "order123",
    ...
  }
}
```

### 13. Get All Orders
Get all orders in the system.

**Endpoint:** `GET /api/v1/orders/all`

**Response:**
```json
{
  "message": "success",
  "orders": [...]
}
```

---

## Product Management Endpoints

### 14. Add Product
Create a new product with images.

**Endpoint:** `POST /api/v1/products`

**Content-Type:** `multipart/form-data`

**Request Body:**
```
title: "Product Name"
description: "Product description"
price: 299
priceAfterDiscount: 249
quantity: 100
category: "categoryId"
subcategory: "subcategoryId"
brand: "brandId"
imgCover: [file]
images: [file1, file2, file3]
```

**Response:**
```json
{
  "message": "success",
  "product": {
    "_id": "prod123",
    "title": "Product Name",
    "slug": "product-name",
    ...
  }
}
```

### 15. Update Product
Update existing product details.

**Endpoint:** `PUT /api/v1/products/:id`

**Content-Type:** `multipart/form-data`

### 16. Delete Product
Remove a product from the system.

**Endpoint:** `DELETE /api/v1/products/:id`

---

## Category Management

### 17. Add Category
**Endpoint:** `POST /api/v1/categories`

**Content-Type:** `multipart/form-data`

**Request Body:**
```
name: "Category Name"
img: [file]
```

### 18. Update Category
**Endpoint:** `PUT /api/v1/categories/:id`

### 19. Delete Category
**Endpoint:** `DELETE /api/v1/categories/:id`

---

## Brand Management

### 20. Add Brand
**Endpoint:** `POST /api/v1/brands`

**Content-Type:** `multipart/form-data`

**Request Body:**
```
name: "Brand Name"
logo: [file]
```

### 21. Update Brand
**Endpoint:** `PUT /api/v1/brands/:id`

### 22. Delete Brand
**Endpoint:** `DELETE /api/v1/brands/:id`

---

## Coupon Management

### 23. Add Coupon
**Endpoint:** `POST /api/v1/coupons`

**Request Body:**
```json
{
  "code": "SUMMER2025",
  "discount": 20,
  "expires": "2025-12-31"
}
```

### 24. Update Coupon
**Endpoint:** `PUT /api/v1/coupons/:id`

### 25. Delete Coupon
**Endpoint:** `DELETE /api/v1/coupons/:id`

### 26. Get All Coupons
**Endpoint:** `GET /api/v1/coupons`

---

## User Management

### 27. Get All Users
**Endpoint:** `GET /api/v1/users`

**Query Parameters:**
- `page` (optional): Page number
- `keyword` (optional): Search keyword
- `sort` (optional): Sort fields

### 28. Get Single User
**Endpoint:** `GET /api/v1/users/:id`

### 29. Update User
**Endpoint:** `PUT /api/v1/users/:id`

### 30. Delete User
**Endpoint:** `DELETE /api/v1/users/:id`

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing Endpoints

You can test all endpoints using:
- **Swagger UI**: Navigate to `http://localhost:4000/api-docs`
- **Postman**: Import the endpoints and test them
- **cURL**: Use command-line to test

### Example cURL Request:
```bash
curl -X GET "http://localhost:4000/api/v1/dashboard/stats" \
  -H "token: your-jwt-token-here"
```

---

## Notes

1. All admin endpoints require authentication with admin role
2. File uploads must use `multipart/form-data` content type
3. Date filters accept ISO 8601 format (YYYY-MM-DD)
4. Images are stored in the `uploads/` directory
5. All monetary values are in the configured currency (EGP by default)

---

## Quick Start for Admin

1. **Login as admin:**
   ```
   POST /api/v1/auth/signin
   { "email": "admin@example.com", "password": "password" }
   ```

2. **Get dashboard stats:**
   ```
   GET /api/v1/dashboard/stats
   Headers: { "token": "your-token" }
   ```

3. **View recent orders:**
   ```
   GET /api/v1/dashboard/recent-orders?limit=10
   Headers: { "token": "your-token" }
   ```

4. **Update order status:**
   ```
   PATCH /api/v1/orders/admin/{orderId}/delivery
   Headers: { "token": "your-token" }
   Body: { "isDelivered": true }
   ```

---

For more detailed API documentation, visit the Swagger UI at:
**http://localhost:4000/api-docs**
