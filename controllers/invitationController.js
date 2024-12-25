
const invitationService = require('../service/invitationService');
const groupUserService = require('../service/groupUserService');
const {groupAdminService} = require('../util/autoWrapService');

exports.sendInvitation = (req , res ,next)=>{
    invitationService.sendInvitation({
        userId : req.body.userId ,
        groupId : req.query.groupId
    })
    .then(result => {
        return res.status(200).json({
            message : "send invitation successfuly"
        })
    }).catch(err => next(err));
}

exports.getInvitationForUser = (req , res , next)=>{
    invitationService.getInvitationForUser(req.user.id)
    .then(invitations => {
        return res.status(200).json({
            invitations : invitations
        });
    }).catch(err => next(err));
}

exports.ecceptInvitation = (req , res , next)=>{
    invitationService.acceptInvitation({
        id : req.params.invitationId,
        userId : req.user.id
    })
    .then(result =>{
        return res.status(200).json(result);
    }).catch(err => next(err));
}

///////////////////////////////////////////////////////////