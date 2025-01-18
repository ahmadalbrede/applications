const adminService = require('../service/adminService');

exports.login = (req , res , next)=>{
    adminService.login(req.body).then(result=>{
        return res.status(200).json(result);
    }).catch(err => next(err));
}

exports.getAllGroups = (req , res , next)=>{
    adminService.getAllGroups().then(result =>{
        return res.status(200).json({
            message : "successfuly",
            groups : result
        });
    }).catch(err => next(err));
}

exports.getUsersForGroup = (req , res , next)=>{
    adminService.getUsersForGroup(req.query.groupId).then(result =>{
        return res.status(200).json({
            message : "successfuly",
            users : result 
        });
    }).catch(err => next(err));
}

exports.getFilesForGroup = (req , res , next)=>{
    adminService.getFilesForGroup(req.query.groupId).then(result =>{
        return res.status(200).json({
            message : "successfuly",
            files : result 
        });
    }).catch(err => next(err));
}

exports.getAllUsers = (req , res , next)=>{
    adminService.getAllUsers().then(result=>{
        return res.status(200).json({
            message : "successfuly",
            users : result
        });
    }).catch(err => next(err));
}

exports.getGroupsForUser = (req , res , next)=>{
    adminService.getGroupsForUser(req.query.userId).then(result =>{
        return res.status(200).json({
            message : "successfuly",
            groups : result
        });
    }).catch(err => next(err));
}

exports.getReportForUser = (req , res , next)=>{
    adminService.getReportForUser(req.query.userId).then(result =>{
        return res.status(200).json({
            message : "successfuly",
            reports : result 
        });
    }).catch(err => next(err));
}