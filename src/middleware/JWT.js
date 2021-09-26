const jwt = require('jsonwebtoken');

// Middleware de verificação do token via jwt
const verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'Não existe token' });
    else {
        jwt.verify(token, 'process.env.JWT_SECRET', (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token de autenticação errado' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}

module.exports = { verifyJwtToken }