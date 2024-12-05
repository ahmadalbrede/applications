const groupService = require('../service/groupService');

module.exports = (req , res , next)=> {

    groupService.getGroup(req.body.groupId)
    .then(result => {
        if(result.adminId === req.user.id){
            return next()
        }
        const error = new Error('permission denied');
        error.statusCode = 403;
        throw error ; 
    }).catch(err =>{
        next(err);
    });
}