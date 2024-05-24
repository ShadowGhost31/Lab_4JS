// routes/authRoutes.js

// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        // Check if user exists
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        // Check if the password is correct
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).send('Invalid email or password');
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // Send the token in response
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// Logout route
router.post('/logout', async (req, res) => {
    try {
        // Clear the token stored in user's document
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged out successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Logout from all devices
router.post('/logoutAll', async (req, res) => {
    try {
        // Clear all tokens stored in user's document
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged out from all devices successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;

module.exports = router;
