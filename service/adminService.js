const adminRepository = require('../repositories/adminRepository');
const groupRepository = require('../repositories/groupRepository');
const groupUserRepository = require('../repositories/GroupUserRepository');
const fileRepository = require('../repositories/fileRepository');
const userRepository = require('../repositories/userRepository');
const reportRepository = require('../repositories/reportRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async(data)=>{
    try{
        const admin = await adminRepository.getSuperAdmin(data.email) ;
        if(!admin){
            const error = new Error('failed login');
            error.statusCode = 401;
            throw error; 
        } 
        const validPassword = await bcrypt.compare(data.password , admin.password);
        if(validPassword){
            const token = jwt.sign({admin : true},'secretkey',
            // {expiresIn: '1h'}
            );
            return {
                message : 'successfuly',
                // userId : user.id,
                token : token
            }
        }
        const error = new Error('invaild credentials');
        error.statusCode = 401 ;
        throw error ;
    }
    catch(err){
        throw err ; 
    }
}

exports.getAllGroups = async()=>{
    try{
        return await groupRepository.getAllGroup();
    }
    catch(err){
        throw err ;
    }
}

exports.getUsersForGroup = async(groupId)=>{
    try{
        return await groupUserRepository.getUsersToGroup(groupId);
    }catch(err){
        throw err ;
    }
}
exports.getFilesForGroup = async(groupId)=>{
    try{
        return await fileRepository.getFilesByGroupId(groupId);
    }
    catch(err){
        throw err ;
    }
}

exports.getAllUsers = async()=>{
    try{
        return await userRepository.getAllUser();
    }
    catch(err){
        throw err ;
    }
}

exports.getGroupsForUser = async(userId)=>{
    try{
        return await groupUserRepository.getAllGroupForUser(userId);
    }
    catch(err){
        throw err ;
    }
}

exports.getReportForUser = async(userId)=>{
    try{
        return await reportRepository.getReportUserToAdmin(userId);
    }
    catch(err){
        throw err ;
    }
}