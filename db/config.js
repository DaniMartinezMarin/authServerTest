const mongoose = require("mongoose");

const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.BBDD_CNN );

        console.log('BBDD Online');

    }catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la BBDD');
    }
}

module.exports = {
    dbConnection
}