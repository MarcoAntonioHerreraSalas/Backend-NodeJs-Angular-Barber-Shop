const router = require('express').Router();

router.post('/', (req, res) => {

    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})

module.exports = router