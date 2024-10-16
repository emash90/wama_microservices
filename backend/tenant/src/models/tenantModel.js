const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    tenantName: {
        type: String,
        required: true
    },
    tenantPhone: {
        type: String,
        required: true
    },
    tenantHouse: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tenantRent: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tenants', tenantSchema);