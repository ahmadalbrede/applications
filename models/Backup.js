const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Backup = sequelize.define('backup',{
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    },
    path : {
        type : Sequelize.STRING , 
        allowNull : false 
    },
    version : {
        type : Sequelize.INTEGER ,
        // autoIncrement : true ,
        allowNull : false ,
        defaultValue : 0
    }
});

module.exports = Backup ;