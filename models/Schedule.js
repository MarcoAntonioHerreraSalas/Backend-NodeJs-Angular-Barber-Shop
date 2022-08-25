const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    lunes: {inicioHorario: String, finHorario: String, comienzoDeDescanso: String,
         horasDescanso: Number, citasDisponiblesPorHorario: Number},
    martes: {inicioHorario: String, finHorario: String, comienzoDeDescanso: String,
         horasDescanso: Number, citasDisponiblesPorHorario: Number},
    domingo: {inicioHorario: String, finHorario: String, comienzoDeDescanso: String,
         horasDescanso: Number, citasDisponiblesPorHorario: Number},
    miercoles: {inicioHorario: String, finHorario: String, comienzoDeDescanso: String,
         horasDescanso: Number, citasDisponiblesPorHorario: Number},
    jueves: {inicioHorario: String, finHorario: String, comienzoDeDescanso: String,
         horasDescanso: Number, citasDisponiblesPorHorario: Number},
    viernes: {inicioHorario: String, finHorario: String, comienzoDeDescanso: String,
         horasDescanso: Number, citasDisponiblesPorHorario: Number},
    sabado:  {inicioHorario: String, finHorario: String, comienzoDeDescanso: String,
         horasDescanso: Number, citasDisponiblesPorHorario: Number},
    
})

module.exports = mongoose.model('Schedule', scheduleSchema);