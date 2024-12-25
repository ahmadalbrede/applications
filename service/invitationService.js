
const invitationRepository = require('../repositories/invitationRepository');
const groupUserRepository = require('../repositories/GroupUserRepository');
exports.sendInvitation = async(dataInvitation)=>{
    try{
        return await invitationRepository.createInvitation(dataInvitation);
    }
    catch(err){
        throw err ;
    }
}

exports.getInvitationForUser = async(userId)=>{
    try{
        return await invitationRepository.getInvitationsForUser(userId);
    }
    catch(err){
        throw err ;
    }
}

exports.acceptInvitation = async(invitationData)=>{
    try{
        const invitation = await invitationRepository.getInvitationById(invitationData.id);
        if(invitation === null){
            const error = new Error('invitation not found')
            error.statusCode = 404
            throw error ;
        }
        if(invitation.userId != invitationData.userId ){
            const error = new Error('permission denied');
            error.statusCode = 403 ; 
            throw error ;
        }
        // invitation.acceptance = true ;
        // await invitation.save();
        await groupUserRepository.createGroupUser({
            userId : invitationData.userId,
            groupId : invitation.groupId
        });
        await invitationRepository.deleteInvitation(invitationData.id);
        return {
            message : "accept invitation successfuly"
        };
    }
    catch(err){
        throw err;
    }
}
/////////////////////////////////////////
