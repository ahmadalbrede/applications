const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const File = sequelize.define('file',{
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    },
    name : {
        type : Sequelize.STRING , 
        allowNull : false 
    },
    path : {
        type : Sequelize.STRING , 
        allowNull : false 
    },
    state : {
        type : Sequelize.BOOLEAN ,
        defaultValue : true 
    }
});

module.exports = File ;