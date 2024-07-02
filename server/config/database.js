const { Sequelize } = require('@sequelize/core');
const { MySqlDialect } = require('@sequelize/mysql');
require('dotenv').config()

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,  
    host: 'localhost',
    port: 3306,
    logging: console.log
});

module.exports = sequelize;
