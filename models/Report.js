const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Report = sequelize.define('report' , {
    id : {
        type : Sequelize.INTEGER , 
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
    checkIn : {
        type : Sequelize.DATE ,
        allowNull : false 
    },
    checkOut : {
        type : Sequelize.DATE ,
        allowNull : false 
    }
});

module.exports = Report ;