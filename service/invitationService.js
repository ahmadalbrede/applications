const Invitation = require('../models/Invitation');
const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');



exports.getInvitationForUser = async(userId)=>{
    try{
        return await Invitation.findAll({
            where : {userId : userId},
            include :{
                model : Group ,
                required : true
            }
        })
        // return await Group.findAll({
        //     include :{
        //         model : Invitation,
        //         required : true ,
        //         where : {userId , userId}
        //     }
        // })
        // return await sequelize.query('SELECT * FROM `invitations` INNER JOIN `groups` ON `invitations`.`groupId` = `groups`.`id` AND `invitations`.`userId` = ?',{
        //         replacements: [userId],});
    }
    catch(err){
        throw err;
    }
}

exports.getInvitation = async(invitationId)=>{
    try{
        return await Invitation.findOne({ where : { id : invitationId }});
    }
    catch(err){
        throw err;
    }
}

exports.acceptInvitation = async(invitation)=>{
    try{

        invitation.acceptance = true ; 
        return invitation.save();
    }
    catch(err){
        throw err;
    }
}