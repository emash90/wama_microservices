const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    tenant_first_name: {
        type: String,
        required: true
    },
    tenant_last_name: {
        type: String,
        required: true
    },
    tenant_phone: {
        type: String,
        required: true
    },
    tenant_house_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tenant_email: {
        type: String,
        required: false,
        default: ''
    },
    tenant_rent: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tenants', tenantSchema);