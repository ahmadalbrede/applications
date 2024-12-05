const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Group = require('./Group');
const GroupUser = require('./GroupUser');
const Invitation = require('./Invitation');


const User = sequelize.define('user' , {
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
    email : {
        type : Sequelize.STRING,
        unique : true ,
        allowNull : false 
    },
    password : {
        type : Sequelize.STRING , 
        allowNull : false 
    }
});

// User.hasMany(Group , {
//     foreignKey : 'adminId',
//     as : 'adminGroup'
// });

// User.hasMany(Group , {through: GroupUser , foreignKey : 'userId'});
// User.hasMany(Invitation , {
//     foreignKey : 'userId' ,
// });
module.exports = User ;