const Report = require('../models/Report');
const File = require('../models/File');
const Group = require('../models/Group');
const User = require('../models/User');

exports.createReportWithTransaction = async(data , transaction)=>{
    return await Report.create(data , { transaction});
}

exports.createReport = async(data )=>{
    return await Report.create(data);
}

exports.getReportByFileId = async(fileId)=>{
    return await Report.findAll({
        include :[{
            model : File ,
            required : true ,
            attributes : ['id','name'],
        },{
            model : User ,
            required : true ,
            attributes : ['id','name'],
        }
        
        ],
        where : {
            fileId : fileId
        }
    });
}

exports.getReportToUser = async(userId , groupId)=>{
    return await Report.findAll({
        include :[{
            model : File ,
            required : true ,
            attributes : ['id','name'],
            include : [{
                model : Group ,
                required : true ,
                attributes : [] ,
                where : {id : groupId}
            }
            ]
        },{
            model : User ,
            required : true ,
            attributes : ['id','name'],
        }
        
        ],
        where : {
                userId : userId 
            }
        }
    )
};