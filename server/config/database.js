import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: 'expensesapp',
    user: 'root',
    password: 'Babadook@gublu11',
    host: 'localhost',
    port: 3306,
    logging: console.log
});

export default sequelize;
