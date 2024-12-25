const express = require('express'); 
const app = express(); 
const sequelize = require('./util/database');
const path = require('path');
const multer = require('multer');
const {fileStore , fileFilter} = require('./middleware/multer')

const authRouter = require('./routers/auth');
const groupRoute = require('./routers/groupRoute');
const invitationRoute = require('./routers/invitationRoute');
const userRoute = require('./routers/userRouter');
const fileRoute = require('./routers/fileRoute');

const User = require('./models/User');
const Group = require('./models/Group');
const GroupUser = require('./models/GroupUser');
const Invitation = require('./models/Invitation');
const SuperAdmin = require('./models/SuperAdmin');
const File = require('./models/File');
const Report = require('./models/Report');

// const routeMiddleware = require('./middleware/routers');

// const autoWrapServices = require('./util/autoWrapService');
// const services = autoWrapServices(path.join(__dirname, 'service'))

app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname , 'uploads')));
app.use(multer({storage : fileStore , limits: { fileSize: 10 * 1024 * 1024 }, fileFilter : fileFilter}).single('file'));
// const AuthAspect = require('./aspects/authAspect'); 
// AuthAspect.apply();
// const { AspectJ } = require('aspectjs');
// const authAspect = require('./aspects/authAspect');

// AspectJ.create()
//     .weave(authAspect); 

app.use(authRouter);
app.use('/group',groupRoute);
app.use('/invitation',invitationRoute);
app.use('/user',userRoute);
app.use('/file',fileRoute);


app.use(( error , req , res , next )=>{
    console.log('hte big middleware errror ror orror ')
    const status = error.statusCode || 500 ; 
    const message = error.message ; 
    console.log(error);
    return res.status(status).json({
        message : message 
    });
});

User.hasMany(Group , {
    foreignKey : 'adminId',
    as : 'adminGroup'
});
// User.belongsToMany(Group , {through: GroupUser , foreignKey : 'userId'});
User.hasMany(GroupUser , {
    foreignKey : 'userId' ,
});
User.hasMany(Invitation , {
    foreignKey : 'userId' ,
});
User.hasMany(Report , {foreignKey : 'userId'});

// Group.belongsToMany(User,{through : GroupUser , foreignKey : 'groupId'});
Group.belongsTo(User , {foreignKey : 'adminId' , as : 'admin'});
Group.hasMany(Invitation,{foreignKey : 'groupId'});
Group.hasMany(GroupUser,{foreignKey : 'groupId'});
Group.hasMany(File , {foreignKey : 'groupId'});

GroupUser.belongsTo(User , {foreignKey : 'userId'});
GroupUser.belongsTo(Group , {foreignKey : 'groupId'});

Invitation.belongsTo(User , {foreignKey : 'userId'});
Invitation.belongsTo(Group , {foreignKey : 'groupId'});

File.belongsTo(Group , {foreignKey : 'groupId'});
File.hasMany(Report , {foreignKey : 'fileId'});

Report.belongsTo(File , {foreignKey : 'fileId'});
Report.belongsTo(User , {foreignKey : 'userId'});

// routeMiddleware;
// {force : true }
sequelize.sync()
.then(result => {
    console.log("the the the ",Invitation.associations);
    // console.log(result);
    app.listen(3000);
})
.catch(err => console.log(err));
