const PRIVATE_KEY = 'mysecretpassword1'
const jwt = require('jsonwebtoken');

function verificarUsuario(req, res, next) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, PRIVATE_KEY)
        if (user) {
            req.user = user;
            next();
        } else {
            res.send('Error')
        }
    } catch (error) {
        res.send('No está logueado')
    }

}

function verificarAdmin(req, res, next) {
    if(req.user.role == 1){
        next();
    } else {
        res.send('No tiene permisos para esta acción')
    }
}

module.exports = {verificarUsuario, verificarAdmin}