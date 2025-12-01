const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// GET /products - list all products
router.get('/', getProducts);

// GET /products/:id - single product
router.get('/:id', getProductById);

// POST /products - create new product
router.post('/', createProduct);

// PUT /products/:id - update product
router.put('/:id', updateProduct);

// DELETE /products/:id - delete product
router.delete('/:id', deleteProduct);

module.exports = router;
