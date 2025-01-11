const Backup = require('../models/Backup');

exports.createBackupWithTransaction = async(data , transaction)=>{
    return await Backup.create(data , {transaction});
}

exports.createBackup = async(data)=>{
    return await Backup.create(data);
}

exports.getAllBackupForFile = async(fileId)=>{
    return await Backup.findAll({
        where : {
            fileId : fileId 
        }
    })
}

exports.getCountBackupWithTransaction = async(fileId , transaction)=>{
    return await Backup.count({
        where : {
            fileId : fileId
        },
        transaction
    });
}

exports.getCountBackup = async(fileId)=>{
    return await Backup.count({
        where : {
            fileId : fileId
        }
    });
}

exports.getBackupById = async(backupId)=>{
    return await Backup.findByPk(backupId);
}