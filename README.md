# **ShoppyGlobe Backend**

A complete backend API system for the ShoppyGlobe E-commerce Application, built using **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

This project has been developed as part of the
**Node.js + Express.js Backend API Assignment (Internshala Trainings).**

---

## **1. Features**

### **Core Functionalities**

* User registration and login with JWT-based authentication.
* Product management APIs (list all products, get product by ID).
* Shopping cart APIs for adding, updating, and removing cart items.
* MongoDB database integration using Mongoose.
* Error handling and request validation for all routes.
* Protected routes for all cart operations.
* ThunderClient API testing with detailed screenshots.

---

## **2. Project Structure**

```
shoppyglobe-backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   └── app.js
│
├── .env
├── package.json
├── package-lock.json
└── README.md
```

---

## **3. API Endpoints**

### **Authentication Routes**

| Method | Endpoint    | Description                                |
| ------ | ----------- | ------------------------------------------ |
| POST   | `/register` | Register a new user                        |
| POST   | `/login`    | Authenticate a user and return a JWT token |

---

### **Product Routes**

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/products`     | Fetch all products           |
| GET    | `/products/:id` | Fetch a single product by ID |

---

### **Cart Routes (Protected)**

Requires:
`Authorization: Bearer <JWT Token>`

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/cart`         | Fetch the logged-in user's cart    |
| POST   | `/cart`         | Add a product to the cart          |
| PUT    | `/cart/:itemId` | Update the quantity of a cart item |
| DELETE | `/cart/:itemId` | Remove an item from the cart       |

---

## **4. MongoDB Collections**

### **Products Collection Example**

```json
{
  "name": "HP Laptop",
  "price": 59999,
  "description": "Powerful laptop for ShoppyGlobe demo",
  "stock": 10
}
```

### **Cart Collection Example**

```json
{
  "user": "ObjectId",
  "items": [
    {
      "product": "ObjectId",
      "quantity": 2
    }
  ]
}
```

---

## **5. Error Handling and Validation**

The project implements comprehensive error handling for the following cases:

* Invalid product ID format
* Product not found
* Missing required fields
* Adding product with quantity less than 1
* Unauthorized access
* Missing or invalid JWT token
* Internal server errors

All errors return consistent JSON responses.

---

## **6. ThunderClient API Testing**

The following test categories are included along with screenshots:

* User Registration
* User Login
* GET All Products
* GET Product by ID
* POST Add to Cart
* PUT Update Cart Item
* DELETE Cart Item
* Invalid Product ID
* Invalid Quantity
* Missing Token
* Invalid Token
* MongoDB Database Views (Products, Cart, Users)

---

## **7. How to Run the Project**

### **Install Dependencies**

```
npm install
```

### **Environment Variables**

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **Start Development Server**

```
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## **8. Technologies Used**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* ThunderClient (API Testing)

---

## **9. Repository Link**

(Insert after pushing to GitHub)

```
https://github.com/Shreyasri30/shoppyglobe-backend
```