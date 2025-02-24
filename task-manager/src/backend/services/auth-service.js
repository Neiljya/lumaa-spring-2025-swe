

const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// JWT setup
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

/** CONSTANTS & CONFIGURATIONS **/
const INVALID_CREDENTIALS_ERR = "Invalid Credentials";

const BCRYPT_COST_FACTOR = 10; // used for bcrypt hash
const JWT_EXPIRATION = '1d';


// data = {username: string, password: string}
const register = async (data) => {
    if (!data.password || !data.username) {
        throw new Error("Username and password are required");
    }
    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_COST_FACTOR);
    const user = await userModel.createUser(data.username, hashedPassword);
    return user;
}

const login = async (data) => {
    const user = await userModel.findUser(data.username);
    if (!user) throw new Error(INVALID_CREDENTIALS_ERR);
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error(INVALID_CREDENTIALS_ERR);
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return { token };
};

module.exports = {
    register,
    login
}