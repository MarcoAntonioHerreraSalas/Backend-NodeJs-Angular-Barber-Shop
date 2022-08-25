const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../models/User');

const schemaUserByEmail = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
})
router.post('/getUserbyEmail', async (req, res) => {
    // validaciones
    const { error } = schemaUserByEmail.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    res.json({
        user : {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            roles: user.roles,
            permissions: user.permissions
        }
    })

  
})


module.exports = router;