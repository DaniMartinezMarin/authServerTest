const jwt = require("jsonwebtoken")

const generarJWT = ( uid, name ) => {

    const payload = { uid, name };

    return new Promise( (revolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                console.error(err);
                reject(err);
            } else {
                revolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}