const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orders: {
        type: Array,
        required: true
    }




})

module.exports = mongoose.model('order', orderSchema)