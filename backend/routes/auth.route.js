const router = require('express').Router();
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword, userType });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) { res.status(500).json({ message: "Server error." }); }
});

router.post('/login', async (req, res) => {
  try {
    console.log("LOGIN ATTEMPT:", req.body.email); // <--- YEH NAYI LINE ADD KAREIN
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });
    res.status(200).json({ message: "Login successful!", user: { id: user._id, name: user.name, email: user.email, userType: user.userType } });
  } catch (error) { res.status(500).json({ message: "Server error." }); }
});

module.exports = router;