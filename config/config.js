
const Sequelize = require('sequelize');
const crate = require('node-crate');
exports.sequelize = new Sequelize('prueba', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false 
    }
  });
exports.crate = 'http://130.206.113.226:4200';
//module.exports = sequelize;

