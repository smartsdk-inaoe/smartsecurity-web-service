
const Sequelize = require('sequelize');
var sequelize = new Sequelize('prueba', 'root', '', {
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
 
module.exports = sequelize;

