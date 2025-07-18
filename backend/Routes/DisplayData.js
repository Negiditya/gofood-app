const express = require('express')
const router = express.Router()
const mongoDB = require('../db')



router.get("/foodData", async (req, res) => {
    try {
        const { foodItems, foodCategory } = await mongoDB()
        res.json({ foodItems, foodCategory })

    } catch (error) {
        console.log(error)

    }
})
module.exports = router