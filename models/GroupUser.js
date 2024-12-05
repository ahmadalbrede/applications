const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./User');
const Group = require('./Group');

const GroupUser = sequelize.define('groupuser',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    }
});

// GroupUser.belongsTo(User , {foreignKey : 'userId'});
// GroupUser.belongsTo(Group , {foreignKey : 'groupId'});

module.exports = GroupUser ; 