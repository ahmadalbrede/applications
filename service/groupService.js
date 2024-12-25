const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const User = require('../models/User');
const groupRepository = require('../repositories/groupRepository');
const groupUserRepository = require('../repositories/GroupUserRepository');

exports.createGroup = async(groupData)=>{
    try{
        const group = await groupRepository.createGroup(groupData);
        await groupUserRepository.createGroupUser({
            groupId : group.id,
            userId : groupData.adminId 
        });
        return {
            message : "group created successfuly",
            groupId : group.id 
        };
    }
    catch(err){
        throw err ; 
    }
}

exports.getGroup = async(groupId)=>{
    try{
        return await groupRepository.getGroupById(groupId);
    }
    catch(err){
        throw err ;
    }
}
exports.getGroupsForUser = async(userId)=>{
    try{
        return await groupUserRepository.getAllGroupForUser(userId);
    }
    catch(err){
        throw err;
    }
}

exports.getGroups = async()=>{
    try {
        return await Group.findAll({
            include :{
                model : User ,
                as : 'admin',
                required : false
            }
        })
    }
    catch(err){
        throw err ;
    }
}

