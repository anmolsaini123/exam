const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.json({ message: "User registered successfully" });
})
router.post('/login', async (req, res) => {
    const { email } = req.body.email
    const { password } = req.body.password
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.json({ message: "Invalid credentials" });
    }
    return res.json({ message: "Login successful", user });
})


module.exports = router;