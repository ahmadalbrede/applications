const backupService = require('../service/backupService');
const File = require('../models/File');

exports.getAllBackupForFill = (req ,res , next)=>{
    backupService.getAllBackupForFile(req.query.fileId , req.user.id)
    .then(result => {
        return res.status(200).json({
            data : result 
        })
    }).catch(err => next(err));
}

exports.downloadBackup = (req , res , next)=>{
    backupService.downloadBackup(req.query.backupId , req.user.id)
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