const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Report = sequelize.define('report' , {
    id : {
        type : Sequelize.INTEGER , 
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
    date : {
        type : Sequelize.DATE,
        allwoNull : false 
    },
    modifications : {
        type : Sequelize.JSON , 
        allowNull : false 
    },
    // userId : {
    //     type : Sequelize.INTEGER,
    //     allowNull : false 
    // }
});

module.exports = Report ;