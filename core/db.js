const { Sequelize } = require('sequelize');

class DBConnection {
  constructor() {
    this.sequelize = new Sequelize('pragetx', 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
    });
  }
}

module.exports = DBConnection;
