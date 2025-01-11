const backupRepository = require('../repositories/backupRepository');
const groupUserRepository = require('../repositories/GroupUserRepository');
const fileRepository = require('../repositories/fileRepository');

exports.getAllBackupForFile = async(fileId , userId)=>{
    try{
        const file = await fileRepository.getFileById(fileId);
        // if(!file){
        //     const error = new Error('file not found');
        //     error.statusCode = 404 ;
        //     throw error ;
        // }
        const groupUser = await groupUserRepository.getgroupUser(file[0].groupId , userId);
        if(!groupUser){
            const error = new Error('not in the group');
            error.statusCode = 403 ;
            throw error ; 
        }
        return await backupRepository.getAllBackupForFile(fileId);
    }catch(err){
        throw err ;
    }
}

exports.downloadBackup = async(backupId , userId)=>{
    try{
        return await backupRepository.getBackupById(backupId);
    }catch(err){
        throw err ; 
    }
}