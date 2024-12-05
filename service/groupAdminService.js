const Invitation = require('../models/Invitation');
const Group = require('../models/Group')

exports.createInvitation = async(data)=>{
    try{
        return await Invitation.create({
            groupId : data.body.groupId ,
            userId : data.body.userId
        });
    }
    catch(err){
        console.log(err);
        throw err ; 
    }
};