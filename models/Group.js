const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./User');
const GroupUser = require('./GroupUser');
const Invitation = require('./Invitation');

const Group = sequelize.define('group',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
    name : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
    adminId : {
        type : Sequelize.INTEGER , 
        // references : {
        //     model : User,
        //     key : 'id'
        // }
    }
});

// Group.belongsTo(User , {foreignKey : 'adminId' , as : 'admin'});

// Group.hasMany(User,{through : GroupUser , foreignKey : 'groupId'});

// Group.hasMany(Invitation,{foreignKey : 'groupId'});

module.exports = Group ; 