const Invitation = require('../models/Invitation');
const Group = require('../models/Group');
const User = require('../models/User');

exports.createInvitation = async (data) => {
    return await Invitation.create(data);
};

exports.getAllInvitation = async ()=>{
    return await Invitation.findAll({
        include : {
            model : Group ,
            required : true ,
        }
    });
};

exports.getInvitationsForUser = async(userId)=>{
    return await Invitation.findAll({
        where : {userId : userId},
        include : {
            model : Group ,
            required : true ,
            include : {
                model : User ,
                as : 'admin',
                required : true ,
                attributes : ['id','name','email']
            }
        }
    });
}

exports.getInvitationById = async (InvitationId)=>{
    return await Invitation.findByPk(InvitationId , {
        include : {
            model : Group ,
            required : true ,
        }
    });
}

exports.updateInvitation = async(data)=>{
    
}
exports.deleteInvitation = async(InvitationId)=>{
    return await Invitation.destroy({
        where : {id : InvitationId}
    });
};