import { DataTypes } from 'sequelize';

import { sequelize } from '../config/config.js';

const Auth_data = sequelize.define('Auth_data', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Auth_data;