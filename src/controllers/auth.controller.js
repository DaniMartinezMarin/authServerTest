const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body )

        // Hash de la contrasña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el JWT
        const token = await generarJWT( dbUser.id, nombre );

        // Crear usuario de BD
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            nombre,
            token
        });

    } catch (error){
        return res.status(50).json({
            ok: false,
            msg: 'Se ha producido un error al crear usuario, por favor contacte con el administrador'
        });
    }

}

const loginUsuario = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try{

        const dbUser = await Usuario.findOne({ email });

        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            })
        }

        //Comprobar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            })
        }

        //Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.nombre );

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.nombre,
            token
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error al hacer login, por favor contacte con el administrador'
        })
    }
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