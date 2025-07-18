const express = require('express')
const router = express.Router()

const Order = require('../models/Orders')


router.post("/ordersData", async (req, res) => {
    try {


        const orderData = req.body
        const userId = req.userId
        const user = await Order.findOne({ userId })


        if (user) {
            await Order.findOneAndUpdate({ userId }, {
                $push: { orders: orderData }
            })
            return res.status(200).json({ success: true, message: "order added" })

        }
        else {
            await Order.create({
                userId, orders: [orderData]
            })
            return res.status(201).json({ success: true, message: "Order created" })
        }


    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, error: "Server error" });

    }
})

router.get("/myorders", async (req, res) => {
    try {

        const { userId } = req
        const ordersData = await Order.findOne({ userId })
        if (!ordersData) {
           return res.status(404).json({ success: false, message: "users don't have any orders" })
        }
        
            res.json({ success: true, ordersData: ordersData.orders })
        

    } catch (error) {
        console.log(error)
       res.status(500).json({ success: false, error: "Server Error" });

    }




})

module.exports = router