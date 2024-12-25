const groupService = require('../service/groupService');

module.exports = (req , res , next)=> {
    groupService.getGroup(req.query.groupId)
    .then(result => {
        if(result.length === 0){
            const error = new Error('group not found');
            error.statusCode = 404 ;
            throw error ;
        }
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