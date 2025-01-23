import User from '../models/user.model.js';
import Auth_data from '../models/authData.model.js';
import { hashPasswd, generateSalt } from '../utils/hashPasswd.js';
import { generateToken } from '../utils/manageToken.js';

const haveUppercase = /[A-Z]/;
const haveNumber = /[0-9]/;
const haveSpecialSymbol = /[!@#$%^&.*]/;

export const postSignUp = async (req, res) => {
    const { full_name, username, email, password } = req.body;

    if (!full_name || !username || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    };

    if (!haveUppercase.test(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos una letra mayuscula' });
    };

    if (!haveNumber.test(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos un numero' });
    };

    if (!haveSpecialSymbol.test(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos un simbolo especial de los siguientes: !, @, #, $, %, ^, &, *.'});
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

        res.json({ message: "Usuario creado"}).status(201);

    } catch (err) {
        res.status(500).json({ message: `${err}, No se pueden repetir usuario o email` });
    }
    
};

export const postSignIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    if (!haveSpecialSymbol.test(username)) {
        return res.status(400).json({ message: 'El nombre de usuario no puede tener simbolos especiales'});
    };

    if (!haveSpecialSymbol.test(password)) {
        return res.status(400).json({ message: 'Contraseña incorrecta'});
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
        return res.status(404).json({ message: 'Usuario no encontrado' });
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

        res.json({ message: 'Login correcto' }).status(200)
    } else {
        res.status(401).json({ message: 'Contraseña incorrecta' });
    }
};

export const postSignOut = async (req, res) => {
    res.clearCookie('access_token')
        .json({ message: 'Logout correcto' })
        .status(200);
};