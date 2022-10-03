const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()
const cors = require('cors');

const app = express();


//Allow Corcs
app.use(cors({origin: '*'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ns88va5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/user');
const servRoutes = require('./routes/service');
const scheduleRoutes = require('./routes/schedule');
const appointmentRoutes = require('./routes/appointment');
const productRoutes = require('./routes/product');
const saleRoutes = require('./routes/sale');
const verifyToken = require('./routes/validate-token');

// route middlewares

app.use('/api/auth', authRoutes);
app.use('/api/user',verifyToken, userRoutes); //usuario
app.use('/api/service',verifyToken, servRoutes); //servicios
app.use('/api/schedule',verifyToken, scheduleRoutes); //horario
app.use('/api/appointment',verifyToken, appointmentRoutes); //citas
app.use('/api/product',verifyToken, productRoutes); //productos
app.use('/api/sale',verifyToken, saleRoutes); //ventas

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});



// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})