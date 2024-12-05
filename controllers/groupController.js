const groupService = require('../service/groupService');
const services = require('../util/autoWrapService');

exports.createGroup = (req , res , next )=> {
    groupService.createGroup({
        name : req.body.name ,
        adminId : req.user.id
    })
    .then(group => {
            groupService.createGroupUser({
                groupId : group.id,
                userId : req.user.id
            }).then(result => {
                return res.status(200).json({
                    message : "group created successfully",
                    data : group
                });
            });
    })
    .catch(err => {
        next(err);
    });
}

exports.getGroupsForUser = (req , res , next )=>{
    groupService.getGroupsForUser(req.user.id)
    .then(groups => {
        return res.status(200).json({
            data : groups
        });
    }).catch(err => {
        next(err);
    });
}

exports.getGroups = async(req , res , next )=> {
    try{
        
        const groups = await services.groupService.getGroups(req , res , next);
        // groupService.getGroups();
        return res.status(200).json(groups);
    }
    catch(err){
        next(err);
    }
}

