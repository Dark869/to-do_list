import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/envConfig.js';

const generateToken = (email, username) => {
    return jwt.sign({
        email: email,
        username: username
    }, 
    JWT_SECRET, 
    {
        expiresIn: '1h'
    });
};

export default generateToken;
