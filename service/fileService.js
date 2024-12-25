const fileRepostory = require('../repositories/fileRepository');
const fs = require('fs');
const groupUserRepository = require('../repositories/GroupUserRepository')
const groupRepository = require('../repositories/groupRepository');
const sequelize = require('../util/database');

exports.addFile = async(data , userId)=>{
    try{
        const groupUser = await groupUserRepository.getgroupUser(data.groupId , userId);
        if(groupUser.length === 0){
            const error = new Error('not in the group') ;
            error.statusCode = 403 ;
            throw error ;
        }
        return await fileRepostory.createFile(data);
    }
    catch(err){
        throw err;
    }
}

exports.updateFile = async(data , userId)=>{
    try{
        const file = await fileRepostory.getFileById(data.fileId);
        if(file.state === true || file.userId !== userId ){
            const error = new Error('you must make check in for file first');
            error.statusCode = 400 ; 
            throw error ;
        }
        return await fileRepostory.updateFile(data)
    }
    catch(err){
        throw err ;
    }
}

exports.getFilesForGroup = async(groupId , userId)=>{
    try{
        const groupUser = await groupUserRepository.getgroupUser(groupId , userId);
        if(groupUser.length === 0){
            const error = new Error('not in the group') ;
            error.statusCode = 403 ;
            throw error ;
        }
        return await fileRepostory.getFilesByGroupId(groupId);
    }
    catch(err){
        throw err ;
    }
}

exports.getFileByPk = async(fileId , userId)=>{
    try{
        const file = await fileRepostory.getFileById(fileId);
        if(file.state === true || file.userId !== userId ){
            const error = new Error('must check in to file for download');
            error.statusCode = 403;
            throw error ;
        }
        return file ;
    }
    catch(err){
        throw err ;
    }
}

exports.deleteFile = async(fileId , userId)=>{
    try{
        const file =  await fileRepostory.getFileById(fileId);
        const group = await groupRepository.getGroupById(file.groupId);
        if(group.adminId !== userId){
            const error = new Error('permission denied')
            error.statusCode = 403 ;
            throw error;
        }
        fs.access(file.path ,fs.constants.F_OK , (err)=> {
            if(err){
                throw err ;
            }
            fs.unlink(file.path , (err)=> {
                const error = new Error('Error deleting file');
                error.err = err ;
            })
        })
        return await fileRepostory.deleteFile(fileId);
    }
    catch(err){
        throw err ;
    }
}

exports.checkInFile = async(fileId , userId)=>{
    try{
        return await sequelize.transaction(async (transaction)=> {
            const file = await fileRepostory.getFileByIdWithlock(fileId , transaction);
            if(!file){
                const error = new Error('file not found');
                error.statusCode = 404 ;
                throw error ;
            }
            if(!file.state){
                const error = new Error('file is reserve');
                error.statusCode = 409;
                throw error ;
            }
            const groupUser = await groupUserRepository.getgroupUserWithTransaction(file.groupId , userId , transaction);
            if(groupUser.length === 0){
                const error = new Error('not in the group');
                error.statusCode = 403 ;
                throw error ;
            }
            file.state = false ;
            file.userId = userId ;
            return await file.save({transaction});
        })
        
        
    }
    catch(err){
        throw err ; 
    }
}

exports.checkInMultipleFile = async(files , userId)=>{
    try{
        return await sequelize.transaction(async (transaction)=>{
            const countFile = await fileRepostory.getFilesWithStateTrue(files ,transaction);
            if(countFile.length !== files.length){
                const error = new Error('One or more files are not available for reservation')
                error.statusCode = 400 ;
                throw error ;
            }
            for (const file of countFile) {
                file.state = false;
                file.userId = userId;
                await file.save({ transaction });
            }
            return {
                message: 'Files reserved successfully'
            }
        
    })
        
        // await fileRepostory.checkInFile(files , userId)
        
    }
    catch(err){
        throw err ;
    }
}

exports.getFileNotAccept = async(groupId)=>{
    try{
        return await fileRepostory.getFileNotAccept(groupId);
    }
    catch(err){
        throw err ;
    }
}

exports.acceptFile = async(fileId , userId)=>{
    try{
        const file = await fileRepostory.getFileById(fileId);
        if(file === null){
            const error = new Error('file not found');
            error.statusCode = 404 ;
            throw error;
        }
        const group = await groupRepository.getGroupById(file.groupId);
        if(group.adminId !== userId){
            const error = new Error('permission denied');
            error.statusCode = 403 ;
            throw error ;
        }
        return await fileRepostory.acceptFile(fileId);
    }
    catch(err){
        throw err ;
    }
}