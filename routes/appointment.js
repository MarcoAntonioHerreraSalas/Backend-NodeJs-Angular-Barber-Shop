const router = require('express').Router();
const Joi = require('@hapi/joi');
const Appointment = require('../models/Appointment');

const appointmentValidate = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    nombre: Joi.string().min(5).max(255).required(),
    numero: Joi.string().min(10).max(10),
    servicio: Joi.string().min(5).max(255).required(),
    id_servicio: Joi.string().min(5).max(255).required(),
    start:  Joi.date().required(),
    allDay:  Joi.boolean().required(),
})


//create appointments
router.post('/add-appointment', async (req,res) => {
    console.log(req.body.numero.length);
    // validaciones
    const { error } = appointmentValidate.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const appoFind = await Appointment.findOne({ nombre: req.body.nombre, start: req.body.start });
    if (appoFind) return res.status(400).json({ error: 'No se puede agregar la cita dos veces en la misma hora' });

    const appo = Appointment(req.body);
    appo.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get all appointments
router.post('/appointments',(req,res) => {

    Appointment
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//delete appointments
router.delete('/appointment/:id',(req,res) => {
    const {id} = req.params;
    Appointment
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})




module.exports = router;