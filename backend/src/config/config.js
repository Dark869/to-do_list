import { Sequelize } from 'sequelize'

import { DB_DIALECT, DB_NAME, DB_PASS, DB_PORT, DB_HOST, DB_USER } from './envConfig.js'

//Config sequelize

export const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    logging: false
});
