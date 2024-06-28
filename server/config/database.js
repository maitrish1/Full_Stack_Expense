const { Sequelize } = require('@sequelize/core');
const { MySqlDialect } = require('@sequelize/mysql');
const dotenv=require('dotenv')
dotenv.config()

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,  // Notice the change from 'user' to 'username'
    host: 'localhost',
    port: 3306,
    logging: console.log
});

module.exports = sequelize;
