const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';


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

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.sendStatus(400);
        }

        const token = parts[1];
        jwt.verify(token, JWT_SECRET, (error, user) => {
            if (error) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    authenticateJWT,
};