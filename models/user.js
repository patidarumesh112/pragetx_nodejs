const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('pragetx', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: 'users', // Specify the table name here
  });

module.exports = User;
