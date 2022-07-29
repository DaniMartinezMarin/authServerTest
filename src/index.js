const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); //El paquete dotenv permite leer las variables de entorno del fichero .env

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection()

// Directorio público
app.use( express.static('public') )

// CORS (el use es el middleware)
app.use( cors() );

// Lectura y parseo del body (el use es el middleware)
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );

// Este puerto estará en el contenedor, para conectarse a él hay que utilizar el de la app definida en el compose
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});