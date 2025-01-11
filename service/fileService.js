const fileRepostory = require('../repositories/fileRepository');
const fs = require('fs');
const groupUserRepository = require('../repositories/GroupUserRepository')
const groupRepository = require('../repositories/groupRepository');
const sequelize = require('../util/database');
const reportRepository = require('../repositories/reportRepository');
const backupRepository = require('../repositories/backupRepository');
const readline = require('readline');
const dayjs = require('dayjs')
const SocketUser = require('../models/SocketUser');
const io = require('../socket');

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
        if(!file.state){
            const error = new Error('can not delete file now , the file is reseve');
            error.statusCode = 409 ; 
            throw error ;
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

exports.updateFile = async(transaction , data , userId)=>{
    try{
        const file = await fileRepostory.getFileByIdWithTransaction(data.fileId , transaction);
        if(file[0].state === true || file[0].userId !== userId ){
            const error = new Error('you must make check in for file first');
            error.statusCode = 400 ; 
            throw error ;
        }
        const modifications = await compareFiles(file[0].path , data.path);

        const reportData = {
            fileId : file[0].id ,
            date : dayjs().format('YYYY-MM-DD HH:mm:ss'),
            modifications : modifications,
            userId : userId
        }

        await reportRepository.createReportWithTransaction(reportData , transaction);

        let count = await backupRepository.getCountBackupWithTransaction(file[0].id , transaction);
        ++count ;
        console.log('count',count);
        const backupData = {
            path : file[0].path,
            version : count,
            userId : userId ,
            fileId : file[0].id
        };
        console.log('backipData',backupData)

        await backupRepository.createBackupWithTransaction(backupData , transaction);
        await notifyGroupUsers(file[0].groupId , file[0] , userId );
        return await fileRepostory.updateFileWithTransaction(data , transaction)
    }
    catch(err){
        throw err ;
    }
}
const User = require('../models/User');
const notifyGroupUsers = async (groupId, file, userId) => {
    const groupUsers = await groupUserRepository.getUsersByGroupId(groupId) ;
    const userIds = groupUsers.map(user => user.id); 
    const myUser = await User.findOne({where : {id : userId}});
    const userSockets = await SocketUser.findAll({
        where : {id : userIds}
    });

    userSockets.forEach((user) => {
        if (user.socketId && user.userId !== userId) { // Exclude the modifier
            io.getIo().to(user.socketId).emit('fileModified', {
                message: `File ${file.name} was modified by ${myUser.name}`,
                fileId : file.id,
                modifiedBy: myUser.name,
            });
        }
    });
};

exports.checkInMultipleFile = async(transaction , files , userId)=>{
    try{
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
        if(file.length === 0){
            const error = new Error('file not found');
            error.statusCode = 404 ;
            throw error;
        }
        const group = await groupRepository.getGroupById(file[0].groupId);
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

async function compareFiles(file1 , file2){
    const fileStream1 = fs.createReadStream(file1);
    const fileStream2 = fs.createReadStream(file2);

    const rl1 = readline.createInterface({ input: fileStream1 ,crlfDelay: Infinity});
    const rl2 = readline.createInterface({ input: fileStream2 });

    const file1Lines = [];
    const file2Lines = [];
    const differingLines = [];

    // for await (const line of rl1) file1Lines.push(line);
    rl1.on('line', (line) => {
        file1Lines.push(line);
    });
    for await (const line of rl2) file2Lines.push(line);

    const maxLines = Math.max(file1Lines.length, file2Lines.length);

    for (let i = 0; i < maxLines; i++) {
        if (file1Lines[i] !== file2Lines[i]) {
            differingLines.push({
                lineNumber: i + 1,
                newFileContent: file2Lines[i] || null,
                oldFileContent: file1Lines[i] || null,
            });
        }
    }
    return differingLines ;
}