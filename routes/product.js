const router = require('express').Router();
const Joi = require('@hapi/joi');
const productModel = require('../models/Product');

const productValidation = Joi.object({
    nombre: Joi.string().min(6).max(255).required(),
    costo: Joi.number().required(),
    precio: Joi.number().required(),
    stock: Joi.number().required(),
    descripcion: Joi.string().min(1).max(255).required(),
})

//get all products
router.get('/products',(req,res) => {
    productModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get product
router.get('/product/:id',(req,res) => {
    const {id} = req.params;
    productModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create product
router.post('/add-product', async (req,res) => {


    // validaciones
    const { error } = productValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const productFind = await productModel.findOne({ nombre: req.body.nombre });
    if (productFind) return res.status(400).json({ error: 'No se puede agregar el mismo producto' });

    const product = productModel(req.body);
    product.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update product
router.put('/product/:id',(req,res) => {
    const {id} = req.params;
    const {nombre,costo,precio,stock,descripcion} = req.body;
    productModel
    .updateOne({_id:id},{$set:{nombre,costo,precio,stock,descripcion}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete product
router.delete('/product/:id',(req,res) => {
    const {id} = req.params;
    productModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;