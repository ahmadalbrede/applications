const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const SuperAdmin = sequelize.define('superadmin' ,{
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    },
    email : {
        type : Sequelize.STRING ,
        allowNull : false ,
        unique : true 
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false 
    }
});

module.exports = SuperAdmin ;