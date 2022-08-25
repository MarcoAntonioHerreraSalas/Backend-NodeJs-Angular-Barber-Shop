const router = require('express').Router();
const Joi = require('@hapi/joi');
const scheduleModel = require('../models/Schedule');

const schemaSchedule = Joi.object({
    lunes: {
        inicioHorario: Joi.string().required(),
        finHorario: Joi.string().required(),
        comienzoDeDescanso: Joi.string().required(),
        horasDescanso: Joi.number().required(), 
        citasDisponiblesPorHorario: Joi.number().required()
    },
   martes: {inicioHorario: Joi.string().required(), finHorario: Joi.string().required(), comienzoDeDescanso: Joi.string().required(),
        horasDescanso: Joi.number().required(), citasDisponiblesPorHorario: Joi.number().required()},
   domingo: {inicioHorario: Joi.string().required(), finHorario: Joi.string().required(), comienzoDeDescanso: Joi.string().required(),
        horasDescanso: Joi.number().required(), citasDisponiblesPorHorario: Joi.number().required()},
   miercoles: {inicioHorario: Joi.string().required(), finHorario: Joi.string().required(), comienzoDeDescanso: Joi.string().required(),
        horasDescanso: Joi.number().required(), citasDisponiblesPorHorario: Joi.number().required()},
   jueves: {inicioHorario: Joi.string().required(), finHorario: Joi.string().required(), comienzoDeDescanso: Joi.string().required(),
        horasDescanso: Joi.number().required(), citasDisponiblesPorHorario: Joi.number().required()},
   viernes: {inicioHorario: Joi.string().required(), finHorario: Joi.string().required(), comienzoDeDescanso: Joi.string().required(),
        horasDescanso: Joi.number().required(), citasDisponiblesPorHorario: Joi.number().required()},
   sabado:  {inicioHorario: Joi.string().required(), finHorario: Joi.string().required(), comienzoDeDescanso: Joi.string().required(),
        horasDescanso: Joi.number().required(), citasDisponiblesPorHorario: Joi.number().required()}
})


//get schedule
router.get('/schedule/',(req,res) => {
    scheduleModel
    .findOne().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//create service
router.post('/add-schedule', async (req,res) => {
    // validaciones
    const { error } = schemaSchedule.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const schedule = scheduleModel(req.body);
    schedule.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})




//update service
router.put('/schedule/:id',(req,res) => {
    const { error } = schemaSchedule.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const {id} = req.params;
    
    const x ={ lunes: {inicioHorario, finHorario, comienzoDeDescanso,
        horasDescanso, citasDisponiblesPorHorario},
   martes: {inicioHorario, finHorario, comienzoDeDescanso,
        horasDescanso, citasDisponiblesPorHorario},
   domingo: {inicioHorario, finHorario, comienzoDeDescanso,
        horasDescanso, citasDisponiblesPorHorario},
   miercoles: {inicioHorario, finHorario, comienzoDeDescanso,
        horasDescanso, citasDisponiblesPorHorario},
   jueves: {inicioHorario, finHorario, comienzoDeDescanso,
        horasDescanso, citasDisponiblesPorHorario},
   viernes: {inicioHorario, finHorario, comienzoDeDescanso,
        horasDescanso, citasDisponiblesPorHorario},
   sabado:  {inicioHorario, finHorario, comienzoDeDescanso,
        horasDescanso, citasDisponiblesPorHorario}} = req.body;


    scheduleModel
    .updateOne({_id:id},{$set:x}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


module.exports = router;