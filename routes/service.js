const router = require('express').Router();
const Joi = require('@hapi/joi');
const serviceModel = require('../models/Service');

const schemaService = Joi.object({
    nombre: Joi.string().min(6).max(255).required(),
    costo: Joi.number(),
    precio: Joi.number(),
    detalle: Joi.string().min(1).max(255).required(),
})

//get all services
router.get('/services',(req,res) => {
    serviceModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get all services
router.get('/service/:id',(req,res) => {
    const {id} = req.params;
    serviceModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create service
router.post('/add-service', async (req,res) => {


    // validaciones
    const { error } = schemaService.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const serviceFind = await serviceModel.findOne({ nombre: req.body.nombre });
    if (serviceFind) return res.status(400).json({ error: 'No se puede agregar el mismo servicio' });

    const service = serviceModel(req.body);
    service.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update service
router.put('/service/:id',(req,res) => {
    const {id} = req.params;
    const {nombre,costo,precio,detalle} = req.body;
    serviceModel
    .updateOne({_id:id},{$set:{nombre,costo,precio,detalle}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete service
router.delete('/service/:id',(req,res) => {
    const {id} = req.params;
    serviceModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;