const { Sequelize } = require('@sequelize/core');
const { MySqlDialect } = require('@sequelize/mysql');

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: 'expensesapp',
    user: 'root',
    password: 'Babadook@gublu11',  // Notice the change from 'user' to 'username'
    host: 'localhost',
    port: 3306,
    logging: console.log
});

module.exports = sequelize;
