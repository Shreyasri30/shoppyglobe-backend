const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /cart (current user's cart)
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    // If no cart yet, return empty cart structure
    if (!cart) {
      return res.status(200).json({
        user: userId,
        items: [],
      });
    }

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// POST /cart (add product to cart)
const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: 'productId and quantity are required' });
    }

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity must be greater than zero' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// PUT /cart/:itemId (update quantity)
const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity == null) {
      return res
        .status(400)
        .json({ message: 'Quantity is required to update cart item' });
    }

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity must be greater than zero' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Check stock
    const product = await Product.findById(item.product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    item.quantity = quantity;
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// DELETE /cart/:itemId (remove item)
const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.remove();
    await cart.save();

    return res.status(200).json({
      message: 'Item removed from cart successfully',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
