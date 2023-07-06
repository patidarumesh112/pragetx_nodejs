const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pragetx', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    tableName: 'orders', // Specify the table name here
  });

module.exports = Order;
