const Sequelize = require('sequelize');


const sequelize = new Sequelize('source-safe', 'root' , '12345678' , {
    dialect : 'mysql',
    host : 'localhost',
    logging: console.log
}); 

module.exports = sequelize ; 