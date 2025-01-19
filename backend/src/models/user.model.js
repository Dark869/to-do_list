import { DataTypes } from "sequelize";

import { sequelize } from "../config/config.js";

const User = sequelize.define('User', {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
});

export default User;