const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pragetx', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Product = sequelize.define('Product', {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    tableName: 'products', // Specify the table name here
  });

module.exports = Product;
