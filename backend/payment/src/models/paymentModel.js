const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    tenant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenants',
        required: true
    },
    house_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Houses',
        required: true
    },
    amount_due: {
        type: Number,
        required: true
    },
    amount_paid: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    date_paid: {
        type: Date,
        required: true
    },
    full_payment: {
        type: Boolean,
        required: true
    },
    payment_mode: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Payments', paymentSchema);