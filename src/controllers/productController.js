const mongoose = require('mongoose');
const Product = require('../models/Product');

/**
 * @desc   Create a new product
 * @route  POST /products
 * @access Public (for assignment demo)
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock } = req.body;

    // Basic validation
    if (!name || price == null || !description || stock == null) {
      return res.status(400).json({
        message: 'name, price, description and stock are required',
      });
    }

    if (price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    if (stock < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    const product = await Product.create({
      name,
      price,
      description,
      stock,
    });

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get all products
 * @route  GET /products
 * @access Public
 */
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get single product by ID
 * @route  GET /products/:id
 * @access Public
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update product details
 * @route  PUT /products/:id
 * @access Public (for assignment demo)
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const { name, price, description, stock } = req.body;

    // Optional fields – but if present, validate
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    if (price !== undefined) {
      if (price < 0) {
        return res.status(400).json({ message: 'Price cannot be negative' });
      }
      updateData.price = price;
    }

    if (stock !== undefined) {
      if (stock < 0) {
        return res.status(400).json({ message: 'Stock cannot be negative' });
      }
      updateData.stock = stock;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Delete a product
 * @route  DELETE /products/:id
 * @access Public (for assignment demo)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
