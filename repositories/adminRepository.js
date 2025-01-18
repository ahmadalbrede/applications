const SuperAdmin = require('../models/SuperAdmin');

exports.getSuperAdmin = async(email)=>{
    return await SuperAdmin.findOne({
        where : {email : email}
    });
}