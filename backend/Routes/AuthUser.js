const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET


router.post("/createuser", [
    body('name', 'Name must 3 characters long').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('location', 'Location is required').notEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        let { name, email, password, location } = req.body
        password = await bcrypt.hash(password, 10);

        await User.create({ name, email, password, location })

        res.json({ success: true })

    } catch (error) {
        console.log(error)
        res.json({ success: false })

    }
})

router.post("/loginuser", [

    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),

], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const data = {
            id: user._id
        }
        const authToken = jwt.sign(data, secret)

        res.json({ success: true, authToken })

    } catch (error) {
        console.log(error)
        res.json({ success: false })

    }
})
module.exports = router