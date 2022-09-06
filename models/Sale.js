const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({

    servicios: {
        type: Array,
        required: true,
    },
    productos: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Sale', saleSchema);