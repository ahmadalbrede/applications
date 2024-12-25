const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (data) => {
    return await Group.create(data);
};

exports.getAllGroup = async ()=>{
    return await Group.findAll({
        include : {
            model : User ,
            as : 'admin',
            required : true ,
            attributes : ['id', 'name', 'email']
        }
    });
};

exports.getGroupById = async (groupId)=>{
    return await Group.findByPk(groupId , {
        include : {
            model : User ,
            as : 'admin',
            required : true ,
            attributes : [ 'id' , 'name' , 'email']
        }
    });
}

exports.deleteGroup = async(groupId)=>{
    return await Group.destroy({
        where : {id : groupId}
    });
};