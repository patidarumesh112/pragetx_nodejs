const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pragetx', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: 'categories', // Specify the table name here
  });

module.exports = Category;
