const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const TOKEN_TYPE = 'Bearer';

/** ERROR CODES **/
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

/******************/

const PART_LENGTH = 2;

// Locations in the parts array where the type and token is
const TYPE_INDEX = 0;
const TOKEN_INDEX = 1;


/**
 * Middleware to authenticate JWT
 * 
 * @param req the request
 * @param res the response
 * @param next the next
 */
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const parts = authHeader.split(' ');

        if (parts.length !== PART_LENGTH || parts[TYPE_INDEX] !== TOKEN_TYPE) {
            return res.sendStatus(BAD_REQUEST);
        }

        const token = parts[TOKEN_INDEX];
        jwt.verify(token, JWT_SECRET, (error, user) => {
            if (error) return res.sendStatus(FORBIDDEN);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(UNAUTHORIZED);
    }
}

module.exports = {
    authenticateJWT,
};