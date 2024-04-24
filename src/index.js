'use strict'

const express = require('express');
const path = require('path');
var mongoose = require('mongoose');

/*
body-parser es un paquete de NPM que analiza los cuerpos de las solicitudes entrantes en un middleware 
antes que sus controladores, disponible en la propiedad req.body. 
 */
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const url = ""
mongoose.Promise = global.Promise;

//**** Ficheros ruta **************************************************************:

var contactRoutes = require('./routes/Contact');

//**** Middlewares ****************************************************************:

/*
El middleware es el software que brinda servicios y funciones comunes a las aplicaciones.
Generalmente, se encarga de la gestión de los datos, los servicios de aplicaciones, la mensajería, la autenticación y 
la gestión de las API.
*/

//Cargamos el bodyParser: middleware para analizar cuerpos de a través de la URL
//Este analizador acepta solo la codificación UTF-8 contenida en el body
app.use(bodyParser.urlencoded({ extended: false }));

//Cualquier tipo de petición lo convertimos a json:
app.use(bodyParser.json());

//Activar el CORS para permitir peticiones AJAX y HTTP desde el frontend.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', contactRoutes);

//Nos conectamos a mongoDB. Opción { useNewUrlParser: true } para utilizar las últimas funcionalidades de mongoDB
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('DB Connection established');

    app.listen(port, () => {
        console.log('servidor ejecutándose en http://localhost:' + port);
    });
});