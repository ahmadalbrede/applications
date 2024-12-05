const Invitation = require('../models/Invitation');
const Group = require('../models/Group');
const GroupUser = require('../models/GroupUser');
const invitationService = require('../service/invitationService');
const groupUserService = require('../service/groupUserService');
const {groupAdminService} = require('../util/autoWrapService');


exports.sendInvitation = (req , res , next )=> {
    
    groupAdminService.createInvitation(req , res , next)
    .then(result => {
        console.log(result)
            return res.status(200).json({
                message : 'invitation sent successfully'
            });
    }).catch(err => {
            next(err)
        }
    );
}

exports.getInvitationForUser = (req , res , next)=> {
    invitationService.getInvitationForUser(req.user.id)
    .then(invitations => {
        if(!invitations){
            return res.status(400).json('there are not invitations');
        }
        return res.status(200).json({
            invitations : invitations
        });
    }).catch(err => {
        throw err;
    });
}

exports.ecceptInvitation = (req , res , next )=> {
    invitationService.getInvitation(req.body.invitationId)
    .then(invitation => {
        if(invitation.userId != req.user.id ){
            const error = new Error('permission denied');
            error.statusCode = 403 ; 
            throw error ;
        }
        return invitationService.acceptInvitation(invitation)
    })
    .then(result => {
        groupUserService.createGroupUser({groupId : result.groupId , userId : result.userId})
        .then(result => {
            return res.status(200).json({
                message : 'invitation accepted successfully',
                groupData : result
            });
        })
    }).catch(err => {
        next(err);
    });
}