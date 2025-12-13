const express = require('express');
const router = express.Router();

router.post("/register", (req, res) => {
    return res.status(201).json({ message: "User registration successful" });
})

router.post("/login", (req, res) => {
    return res.status(200).json({ message: "User login successful" });
})
module.exports = router;