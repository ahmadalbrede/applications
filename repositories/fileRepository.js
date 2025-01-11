const File = require('../models/File');

exports.createFile = async(data)=>{
    return await File.create(data);
}
exports.updateFileWithTransaction = async(data , transaction)=>{
    return await File.update(
        {path : data.path , state : true , userId : null},{
            where : {
                id : data.fileId
            },
            transaction
        }
    )
}

exports.updateFile = async(data)=>{
    return await File.update(
        {path : data.path , state : true , userId : null},{
            where : {
                id : data.fileId
            }
        }
    )
}

exports.getFilesByGroupId = async(groupId)=>{
    return await File.findAll({
        where : {
            groupId : groupId ,
            accept : true
        }
    })
}

exports.getFileById = async(fileId)=>{
    return await File.findByPk(fileId);
}

exports.getFileByIdWithTransaction = async(fileId , transaction)=>{
    return await File.findAll({
        where : {
            id : fileId
        },
        transaction
    });
}

exports.getFileById = async(fileId)=>{
    return await File.findAll({
        where : {
            id : fileId
        },
    });
}

exports.deleteFile = async(fileId)=>{
    return await File.destroy({
        where : {id : fileId}
    });
}

exports.checkInFile = async(fileId , userId)=>{
    return await File.update(
        { state : false , userId : userId },
        {
            where: {
                id: fileId,
            },
        },)
}

exports.getFilesWithStateTrue = async(files , transaction)=>{
    return await File.findAll({
        where : { id : files , state : true } ,
        lock : transaction.LOCK.UPDATE,
        transaction
    })
}

exports.getFileNotAccept = async(groupId)=>{
    return await File.findAll({
        where : {groupId : groupId , accept : false}
    })
}

exports.acceptFile = async(fileId)=>{
    return await File.update(
        {accept : true },
        {
            where : {id : fileId}
        }
    )
}

exports.getFileByIdWithlock = async(fileId , transaction)=>{
    return await File.findOne({
        where : {id : fileId},
        lock: transaction.LOCK.UPDATE,
        transaction ,
    })
}