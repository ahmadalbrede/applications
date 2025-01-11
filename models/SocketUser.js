const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const SocketUser = sequelize.define('socketUser',{
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    },
    socketId : {
        type : Sequelize.STRING , 
        allowNull : false 
    },
    userId : {
        type : Sequelize.INTEGER ,
        defaultValue : null 
    }
});

module.exports = SocketUser ;