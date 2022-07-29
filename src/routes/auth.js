const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear un nuevo usuario
router.post( '/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min:6 }),
    validarCampos //custom middleware
], crearUsuario);

// Login de usuario
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min:6 }),
    validarCampos
] , loginUsuario);

// Validar y revalidar token
router.get( '/renew', renewToken);


module.exports = router;