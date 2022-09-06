const mongoose = require('mongoose');

const producSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    costo: {
        type: Number,
        required: true,
        min: 6,
        max: 1024
    },
    precio: {
        type: Number,
        required: true,
        minlength: 6
    },
    stock: {
        type: Number,
        required: true,
        minlength: 6
    },
    descripcion: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Product', producSchema);