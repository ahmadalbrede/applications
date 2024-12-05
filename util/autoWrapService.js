
// const fs = require('fs');
// const path = require('path');
// const applyAspect = require('./applyAspect'); // وظيفة تغليف
// const authAspect = require('../aspects/authAspect'); // الاسبيكت المستخدم

// function autoWrapServices(servicesPath) {
//     const wrappedServices = {};
    
//     // قراءة جميع الملفات داخل مجلد الخدمات
//     fs.readdirSync(servicesPath).forEach((file) => {
//         if (file.endsWith('.js')) { // فقط ملفات الـ JavaScript
//             const serviceName = path.basename(file, '.js');
            
//             // تحميل الخدمة
//             const service = require(path.join(servicesPath, file));
            
//             // تغليف الخدمة بالـ Aspect
//             Object.keys(service).forEach((key) => {
//                 if (typeof service[key] === 'function') {
//                     wrappedServices[key] = applyAspect(service[key], {
//                         before: authAspect.before,
//                         after: authAspect.after,
//                         onException: authAspect.onException,
//                     });
//                 } else {
//                     wrappedServices[key] = service[key]; // خصائص أخرى بدون تغليف
//                 }
//             });
//             // wrappedServices[serviceName] = applyAspect(service, {
//             //     before: authAspect.before,
//             //     after: authAspect.after,
//             //     onException: authAspect.onException,
//             // });
//             }
//     });

//     return wrappedServices;
// }
// const services = autoWrapServices(path.join(__dirname, '..','service'));
// module.exports = services;
// // module.exports = autoWrapServices;

////////////////////////////////////////////////
const groupService = require('../service/groupService');
const invitationService = require('../service/invitationService');
const groupAdminService = require('../service/groupAdminService');
const userService = require('../service/userService'); 
// const authService = require('../service/userService');

const authAspect = require('../aspects/authAspect');
const adminAspect = require('../aspects/adminGroupAspect');
const applyAspect = require('./applyAspect');

const registerValidationAspect = require('../aspects/validationAspect/registerValidationAspect');

const wrappedGroupService = applyAspect(groupService, authAspect);
const wrappedInvitationService = applyAspect(invitationService, authAspect);
const wrappedGroupAdminService = applyAspect(applyAspect(groupAdminService , adminAspect),authAspect);

const wrappedUserService = applyAspect({createUser : userService.createUser} , registerValidationAspect)
// const wrappedUserService = {
//     createUser: applyAspect(
//         { createUser: userService.createUser },
//         registerValidationAspect
//     ).createUser,
// };

module.exports = {
    groupService: wrappedGroupService,
    invitationService: wrappedInvitationService,
    groupAdminService : wrappedGroupAdminService,
    userService: wrappedUserService,
};