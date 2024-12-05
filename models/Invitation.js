const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./User');
const Group = require('./Group');

const Invitation = sequelize.define('invitation' , {
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    },
    acceptance : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    }
    // senderId : {
    //         type : Sequelize.INTEGER ,
    //         allowNull : false ,
    //         references : {
    //             model : 'User' ,
    //             key : 'id'
    //         }
    // },
    // receiverId : {
    //     type : Sequelize.INTEGER ,
    //     allowNull : false ,
    //     references : {
    //         model : 'User',
    //         key : 'id'
    //     }
    // }
});

// Invitation.belongsTo(User , {foreignKey : 'userId'});
// Invitation.belongsTo(Group , {foreignKey : 'groupId'});

module.exports = Invitation;