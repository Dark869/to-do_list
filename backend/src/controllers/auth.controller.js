import User from '../models/user.model.js';
import Auth_data from '../models/authData.model.js';
import { hashPasswd, generateSalt } from '../utils/hashPasswd.js';
import { generateToken } from '../utils/manageToken.js';
import { JWT_SECRET } from '../config/envConfig.js';
import jwt from 'jsonwebtoken';

const haveUppercase = /[A-Z]/;
const haveNumber = /[0-9]/;
const haveSpecialSymbol = /[!@#$%^&.*]/;

export const postSignUp = async (req, res) => {
    const { full_name, username, email, password } = req.body;

    if (!full_name || !username || !email || !password) {
        return res.status(400).json({ success: false, error: 'Faltan datos.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, error: 'La contraseña debe tener al menos 8 caracteres.' });
    };

    if (!haveUppercase.test(password)) {
        return res.status(400).json({ success: false, error: 'La contraseña debe tener al menos una letra mayuscula.' });
    };

    if (!haveNumber.test(password)) {
        return res.status(400).json({ success: false, error: 'La contraseña debe tener al menos un numero.' });
    };

    if (!haveSpecialSymbol.test(password)) {
        return res.status(400).json({ success: false, error: 'La contraseña debe tener al menos un simbolo especial de los siguientes: !, @, #, $, %, ^, &, *.'});
    };

    try {
        const newUser = await User.create({
            full_name,
            username,
            email
        });

        const salt = generateSalt();

        const passwdHashed = hashPasswd(password, salt);

        const addPassword = await Auth_data.create({
            id_user: newUser.id,
            password: passwdHashed,
            salt: salt
        });

        res.status(201).json({ success: true, message: "Usuario creado exitosamente."});

    } catch (err) {
        res.status(500).json({ success: false, error: `${err}, No se pueden repetir usuario o email.` });
    }
    
};

export const postSignIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Faltan datos.' });
    }

    if (haveSpecialSymbol.test(username)) {
        return res.status(400).json({ success: false, error: 'El nombre de usuario no puede tener simbolos especiales.'});
    };

    if (!haveSpecialSymbol.test(password)) {
        return res.status(400).json({ success: false, error: 'Contraseña incorrecta.'});
    }

    const searchUser = await User.findOne({
        where: {
            username
        }
    });

    const searchAuthData = await Auth_data.findOne({
        where: {
            id_user: searchUser.id
        }
    });

    if (!searchUser || !searchAuthData) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado.' });
    }

    const passwd = hashPasswd(password, searchAuthData.salt);

    if (passwd === searchAuthData.password) {
        const token = generateToken(searchUser.email, username);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24
        });

        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.' });
    } else {
        res.status(401).json({ success: false, error: 'Contraseña incorrecta.' });
    }
};

export const postSignOut = async (req, res) => {
    res.status(200)
        .clearCookie('access_token')
        .json({ success: true, message: 'Se cerro la sesión correctamente.' });
};

export const postVerifyToken = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ success: false, error: "No token provided." });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ success: true, data: decoded, message: "Token valido." });
    } catch (error) {
        res.status(403).json({ success: false, error: "Invalid token." });
    }
};