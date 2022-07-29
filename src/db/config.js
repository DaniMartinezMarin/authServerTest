const { log } = require("console");
const mongoose = require("mongoose");

const dbConnection = async() => {

    await mongoose.connect( process.env.BBDD_CNN )
            .then(db => console.log('BBDD conectada a', db.connection.host))
            .catch(err => {
                console.error(err);
                throw new Error('Error al inicializar la BBDD');
            });
}

module.exports = {
    dbConnection
}