const { response, request } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async( req = request, res = response ) => {

    const { nombre, email, password } = req.body;

    try {

        // Verificar correo único
        const usuario = await Usuario.findOne({ email })

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese igual'
            })
        }

        //Crear usuario con el modelo
        const dbUser = new Usuario( req.body )

        // Hash de la contrasña

        // Generar el JWT

        //Crear usuario de BD
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            nombre
        });

    } catch (error){
        return res.status(50).json({
            ok: false,
            msg: 'Se ha producido un error al crear usuario, por favor contacte con el administrador'
        });
    }

}

const loginUsuario = ( req = request, res = response ) => {

    const { email, password } = req.body;
    console.log(email, password);

    return res.json({
        ok:true,
        msg: 'Login de usuario /'
    });
}

const renewToken = ( req = request, res = response ) => {
    return res.json({
        ok:true,
        msg: 'Renew'
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
};