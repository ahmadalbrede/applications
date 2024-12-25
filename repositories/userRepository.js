const User = require('../models/User');
const { Op } = require("sequelize");
const GroupUser = require('../models/GroupUser');

exports.createUser = async (data) => {
    return await User.create(data);
};

exports.getAllUser = async ()=>{
    return await User.findAll({
        attributes : ['id','name','email']
    });
}

exports.getUserByName = async(name)=>{
    return await User.findAll({
        where : {
            name:{
            [Op.substring]: name
        }},
        attributes : ['id','name','email']
    })
}

exports.getUserById = async (userId)=>{
    return await User.findByPk(userId , {
        attributes: { exclude: ['password'] }
    });
}

exports.getUserForSendInvitation = async(groupId)=>{
    return await User.findAll({
        include : {
            model : GroupUser,
            required : false ,
            // attributes : [],
            where : {
                groupId : {
                    [Op.ne] : groupId 
                }
            }
        }
    })
}

exports.getUserByEmail = async(userEmail)=>{
    return await User.findOne({
        where : {email : userEmail},
        attributes : ['id','name','email','password']
    });
}

exports.deleteUser = async(userId)=>{
    return await User.destroy({
        where : {id : userId}
    });
};