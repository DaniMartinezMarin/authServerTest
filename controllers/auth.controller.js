const { response } = require('express')
const { request } = require('express')

const crearUsuario = ( req = request, res = response ) => {

    const { nombre, email, password } = req.body;
    console.log(nombre, email, password);

    return res.json({
        ok:true,
        msg: 'Crear usuario /new'
    });
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