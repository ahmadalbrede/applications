const GroupUser = require('../models/GroupUser');

exports.createGroupUser = async(data)=>{
    try{
        return await GroupUser.create(data);
    }
    catch(err){
        throw err ; 
    }
}
