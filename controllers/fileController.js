const fileService = require('../service/fileService');
const path = require('path');
const groupService = require('../service/groupService');

exports.addFile = (req, res, next) => {
    const data = req.body;
    const file = req.file;
    if (!file) {
        const error = new Error('The file is required');
        error.statusCode = 422;
        return next(error); 
    }
    data.path = file.path;
    groupService.getGroup(data.groupId)
    .then(group => {
        if (group.adminId === req.user.id) {
            data.accept = true;
        }
        return fileService.addFile(data, req.user.id);
    })
    .then(result => {
        res.status(201).json({
            message: 'File added successfully',
            fileData: result,
        });
    })
    .catch(err => next(err)); 
};

exports.updateFile = (req , res , next)=>{
    const file = req.file ;
    if(!file){
        const error = new Error('the file is required');
        error.statusCode = 422 ;
        throw error ;
    }
    const data = req.query ;
    data.path = file.path;
    fileService.updateFile(data , req.user.id)
    .then(result => {
        return res.status(200).json({
            message : "check out successfuly",
        })
    }).catch(err => next(err));
}

exports.getFilesForGroup = (req , res , next)=>{
    fileService.getFilesForGroup(req.query.groupId , req.user.id)
    .then(result => {
        return res.status(200).json({
            files : result
        })
    }).catch(err => next(err));
}

exports.downloadFile = (req , res , next)=>{
    const fileId = req.query.fileId
    fileService.getFileByPk(fileId , req.user.id)
    .then(file => {
        if(!file){
            return res.status(404).json({
                message : "file not found"
            })
        }
        res.download(file.path , (err)=>{
            if(err){
                const error = new Error('Error downloading file');
                error.err = err ;
                throw error;
            }
        })
    }).catch(err => next(err));
}

exports.deleteFile = (req , res , next)=>{
    fileService.deleteFile(req.query.fileId , req.user.id)
    .then(result => {
        return res.status(200).json({
            message : "deleted file successfuly"
        })
    })
    .catch(err => next(err));
}

exports.checkInFile = (req , res ,next)=>{
    fileService.checkInFile(req.query.fileId , req.user.id)
    .then(result => {
        if(!result){
            return res.status(403).json({
                message : "this file is reserved"
            })
        }
        return res.status(200).json({
            message : "check in file successfuly"
        })
    })
    .catch(err => next(err));
}

exports.checkInMultipleFile = (req , res , next)=>{
    const files = req.body.files ;
    if (!Array.isArray(files) || files.length === 0) {
        const error = new Error('fileIds is required and must be an array');
        error.statusCode = 400;
        return next(error);
    }
    fileService.checkInMultipleFile(files , req.user.id)
    .then(result => {
        return res.status(200).json(result)
    }).catch(err => next(err));
}

exports.getFilesNotAccept = (req , res , next)=>{
    fileService.getFileNotAccept(req.query.groupId)
    .then(result => {
        return res.status(200).json({files : result});
    }).catch(err => next(err));
}

exports.acceptFile = (req , res , next)=>{
    fileService.acceptFile(req.query.fileId , req.user.id)
    .then(result => {
        return res.status(200).json({
            message : 'accept file successfuly'
        })
    }).catch(err => next(err));
}