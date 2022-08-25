const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    precio: {
        type: Number,
        required: true,
    },
    costo: {
        type: Number,
        required: true,
    },
    detalle: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    
})

module.exports = mongoose.model('Service', serviceSchema);