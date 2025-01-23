import { DataTypes } from "sequelize";

import { sequelize } from "../config/config.js";

const Task = sequelize.define('Task', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
    },
    isReady: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

export default Task;