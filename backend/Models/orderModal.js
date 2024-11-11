const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.ObjectId,
        ref:'datatables',
        required: [true, 'Order must belong to a User!']
    },
    products: [
        {
          product_title: { type: String, required: true },
          quantity: { type: Number, required: true }
        } 
    ],
    date_order: { type: Date, default: Date.now() , required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    total_purchase: { type: Number, required: true }
});

const OrderModal = mongoose.model('Order', orderSchema);

module.exports = OrderModal;