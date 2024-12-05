const multer = require('multer');
const path = require('path');

exports.fileStore = multer.diskStorage({
    destination : (req , file , cb )=>{
        cb(null , 'uploads');
    },
    filename : (req , file , cb)=>{
        cb(null , Date.now()+'-'+file.originalname);
    }
});

exports.fileFilter = (req , file , cb)=>{
    const allowtype = /txt|docx/;
    const ext = allowtype.test(path.extname(file.originalname).toLowerCase());
    const mime = file.mimetype === 'text/plain' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if(ext && mime ){
        cb(null , true);
    }else{
        cb(null , false);
    }
};
