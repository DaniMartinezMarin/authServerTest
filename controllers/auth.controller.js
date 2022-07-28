const { response } = require('express')

const crearUsuario = ( req, res = response ) => {

    return res.json({
        ok:true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = ( req, res = response ) => {

    return res.json({
        ok:true,
        msg: 'Login de usuario /'
    });
}

const renewToken = ( req, res = response ) => {
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