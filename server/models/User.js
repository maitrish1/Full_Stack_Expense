import {DataTypes} from '@sequelize/core'
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isPremium:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }, {
        timestamps: true
    });

export default User;
