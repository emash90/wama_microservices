const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    house_number: {
        type: String,
        required: true,
        trim: true
    },
    house_type: {
        type: Number, // 0 = residential , 1 = commercial
        required: true

    },
    house_location: {
        type: String,
        required: true
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    house_price: {
        type: Number,
        required: true
    },
    occupied: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const House = mongoose.model('House', houseSchema);

module.exports = House;
