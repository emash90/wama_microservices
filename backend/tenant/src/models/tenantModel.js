const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    tenant_name: {
        type: String,
        required: true
    },
    tenant_phone: {
        type: String,
        required: true
    },
    tenant_house: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tenant_rent: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tenants', tenantSchema);