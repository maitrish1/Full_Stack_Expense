const { DataTypes } = require('@sequelize/core');
const sequelize = require('../config/database.js');
const { v4: uuidv4 } = require('uuid');

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = ForgotPasswordRequests;
