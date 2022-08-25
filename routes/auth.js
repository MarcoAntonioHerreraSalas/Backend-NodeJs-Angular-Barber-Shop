const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    avatar: Joi.string().min(6).max(1024).required(),
    roles: Joi.array().required(),
    permissions: Joi.array().required()
})


router.post('/register', async (req, res) => {

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    // validate user
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        avatar: req.body.avatar,
        roles: req.body.email,
        permissions: req.body.email
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})


const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/ingresar', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })


    const expIn =  "2h";
     //create token
    const token = jwt.sign({
        name: user.name,
        id: user._id,
        expiresIn: expIn,
    }, process.env.TOKEN_SECRET)

    // user: {
    //     _id: user._id,
    //     name: user.name,
    //     email: email._id,
    //     avatar:user.avatar,
    //     roles:user.roles,
    //     permissions: user.permissions,
    // }


    res.json({
        access_token: token,
        token_type: "bearer",
        expires_in: expIn,
        exp: expIn,
        refresh_token: token,
    })

  
})





module.exports = router;