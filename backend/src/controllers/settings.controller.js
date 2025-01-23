import User from "../models/user.model.js";
import Auth_data from "../models/authData.model.js";
import { hashPasswd, generateSalt } from "../utils/hashPasswd.js";

export const getUserData = async (req, res) => {
    const user = req.user.username;

    const userDB = await User.findOne({
        where: {
            username: user
        }
    });

    if (!userDB) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json( userDB ).status(200);
};

export const putUpdateUserData = async (req, res) => {
    const user = req.user.username;
    const { full_name, email, oldPassword, newPassword } = req.body;

    if (!full_name || !email || (!oldPassword && !newPassword)) {
        return res.status(400).json({ message: 'Al menos algun dato se debe actualizar' });
    }

    const userDB = await User.findOne({
        where: {
            username: user
        }
    });

    if (!userDB) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const authDataDB = await Auth_data.findOne({
        where: {
            id_user: userDB.id
        }
    });

    if (newPassword) {
        const hashOldPasswd = hashPasswd(oldPassword, authDataDB.salt);

        if (hashOldPasswd !== authDataDB.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const salt = generateSalt();
        const hashNewPasswd = hashPasswd(newPassword, salt);

        await Auth_data.update({
            password: hashNewPasswd,
            salt
        }, {
            where: {
                id_user: userDB.id
            }
        });
    }

    if (full_name) {
        await User.update({
            full_name
        }, {
            where: {
                username: user
            }
        });
    }

    if (email) {
        await User.update({
            email
        }, {
            where: {
                username: user
            }
        });
    }

    res.json({ message: 'Datos actualizados correctamente' }).status(200);
};