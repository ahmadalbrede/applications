const GroupUser = require('../models/GroupUser');
const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroupUser = async (data) => {
    return await GroupUser.create(data);
};

exports.getAllGroupForUser = async (userId)=>{
    return await GroupUser.findAll({
        where : {userId : userId },
        include : {
            model : Group ,
            required : true ,
            include : {
                model : User ,
                as : 'admin',
                required : true ,
                attributes : [ 'id' , 'name' , 'email']
            }
        }
    });
};

exports.deleteGroupUser = async(groupUserId)=>{
    return await GroupUser.destroy({
        where : {id : groupUserId}
    });
};

exports.getgroupUser = async(groupId , userId)=>{
    return await GroupUser.findAll({
        where : {
            userId : userId ,
            groupId : groupId 
        }
    })
}

exports.getUsersByGroupId = async(groupId)=>{
    return await GroupUser.findAll({
        where : {groupId : groupId}
    });
}

exports.getUsersToGroup = async(groupId)=>{
    return await GroupUser.findAll({
        where : {groupId : groupId},
        include : {
            model : User , 
            required : true,
            attributes : ['id' , 'name' , 'email']
        }
    })
}

exports.getgroupUserWithTransaction = async (groupId, userId, transaction) => {
    return await GroupUser.findAll({
        where: { 
            groupId : groupId , 
            userId : userId 
        },
        transaction,
    });
};