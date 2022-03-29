
let jwt = require('jsonwebtoken');

// This class was heavily inspired by https://github.com/CharlBest/nean-stack-starter

class Authentication {

    static loginRequired(req, res, next) {
        if (!res.locals.user) {
            res.status(401).send({ detail: 'Unauthorized user' });
        }

        next();
    }

    static setUser(req, res, next) {
        const token = Authentication.getTokenInHeader(req);

        if (!token) {
            res.locals.user = null;
            next();
        } else {
            jwt.verify(token, '37C0-E231-E1F5-C407-80AA-94B8-F7AE-E4BB', { issuer: process.env.ISSUER_NAME }, (error, decode) => {
                if (error) {
                    res.locals.user = null;
                    // TODO: not sure if removing this is the right thing to do.
                    // return res.status(401).json({ message: 'Unauthorized user' });
                } else if (decode.data) {
                    res.locals.user = decode.data;
                }

                next();
            });
        }
    }

    static getTokenInHeader(req) {
        let token = null;
        const authorization = req.headers.authorization;

        // Retrieve the token form the Authorization header
        if (authorization && authorization.length > 8 && authorization.split(' ')[0] === 'Bearer') {
            token = authorization.split(' ')[1];
        }

        return token;
    }
}

module.exports = {Authentication};