const express = require('express');
const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require('../controllers/cartController');

const authMiddleware = require('../middleware/authMiddleware');

// All cart routes are protected with JWT

// GET /cart - get current user's cart
router.get('/', authMiddleware, getCart);

// POST /cart - add product to cart
router.post('/', authMiddleware, addToCart);

// PUT /cart/:itemId - update quantity of an item
router.put('/:itemId', authMiddleware, updateCartItem);

// DELETE /cart/:itemId - remove item from cart
router.delete('/:itemId', authMiddleware, removeCartItem);

module.exports = router;
