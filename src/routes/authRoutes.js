const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// POST /register - register a new user
router.post('/register', registerUser);

// POST /login - login user and return JWT token
router.post('/login', loginUser);

module.exports = router;

