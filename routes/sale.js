const router = require('express').Router();
const Joi = require('@hapi/joi');
const saleModel = require('../models/Sale');

const schemaSale = Joi.object({
    productos: Joi.array().required(),
    servicios: Joi.array().required(),
    total: Joi.number().required(),
    date_created: Joi.date(),
    date_updated: Joi.date(),
})

//get all sales
router.get('/sales',(req,res) => {
    saleModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get sale
router.get('/sale/:id',(req,res) => {
    const {id} = req.params;
    saleModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create sale
router.post('/add-sale', async (req,res) => {
    // validaciones
    const { error } = schemaSale.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    

    const sale = saleModel(req.body);
    sale.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update sale
router.put('/edit-sale/:id',(req,res) => {
    const {id} = req.params;
    const {productos,servicios,total,date_created} = req.body;
    const {date_updated} = Date.now;
    saleModel
    .updateOne({_id:id},{$set:{productos,servicios,total,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete sale
router.delete('/sale/:id',(req,res) => {
    const {id} = req.params;
    saleModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;