const express = require('express');
const cors = require('cors');
require('dotenv').config(); //El paquete dotenv permite leer las variables de entorno del fichero .env

console.log(process.env);

//Crear el servidor/aplicación de express
const app = express();

// CORS (middleware)
app.use( cors() );

// Lectura y parseo del body (middleware)
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});