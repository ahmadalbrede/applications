const reportRepository = require('../repositories/reportRepository');

exports.getReportForMember = async(fileId)=>{
    try{
        return await reportRepository.getReportByFileId(fileId);
    }catch(err){
        throw err ;
    }
}

exports.getReportToUser = async(userId , groupId)=>{
    try{
        return await reportRepository.getReportToUser(userId , groupId);
    }catch(err){
        throw err ;
    }
}