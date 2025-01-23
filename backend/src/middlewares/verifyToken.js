import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/envConfig.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).send({'message': 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send({'message': `${err}`});
    }
};

export default verifyToken;