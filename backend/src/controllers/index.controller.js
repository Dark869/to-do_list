import User from '../models/user.model.js';
import Auth_data from '../models/authData.model.js';
import { hashPasswd, generateSalt } from '../utils/hashPasswd.js';
import generateToken from '../utils/generateToken.js';

export const getAddUser = async (req, res) => {
    const users = await User.findAll();
    const authData = await Auth_data.findAll();
    res.send({users, authData}).status(200);
};

export const postAddUser = async (req, res) => {
    const { full_name, username, email, password } = req.body;

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

        res.send({newUser, addPassword}).status(201);

    } catch (err) {
        res.status(500).send({ message: `${err}, No se pueden repetir usuario o email` });
    }
    
};

export const postSignIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({ message: 'Faltan datos' });
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
        res.status(404).send({ message: 'Usuario no encontrado' });
    }

    const passwd = hashPasswd(password, searchAuthData.salt);

    if (passwd === searchAuthData.password) {
        const token = generateToken(searchUser.email, username);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        });

        res.send({ message: 'Login correcto' }).status(200)
    } else {
        res.status(401).send({ message: 'Contraseña incorrecta' });
    }
};
