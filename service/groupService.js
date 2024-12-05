const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const User = require('../models/User');

exports.createGroup = async(groupData)=>{
    try {
        const group = await Group.create(groupData);
        return group ; 
    }
    catch (err){
        throw err; 
    }
};

exports.getGroupsForUser = async(userId)=>{
    try{
        // {where : {userId : userId}},
        return await Group.findAll({
            include :[{
                    model : GroupUser ,
                    required : true ,
                    where : {userId : userId}
                },
                {
                    model:User,
                    as : 'admin',
                    required : true ,
                }
            ]
        });
    }
    catch(err){
        throw err ; 
    }
}

exports.getGroup = async(groupId)=>{
    try{
        return await Group.findOne({where : {id : groupId}});
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

