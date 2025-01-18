const express = require('express'); 
const router = express.Router();
const adminController = require('../controllers/adminController');
const authValidation = require('../util/validations/authValidation');
const is_superAdmin =require('../middleware/is_superAdmin');

router.post('/login',
authValidation.loginValidation,
adminController.login);

router.get('/groups',
is_superAdmin,
adminController.getAllGroups);

router.get('/users-group',
is_superAdmin,
authValidation.groupIdValidation,
adminController.getUsersForGroup);

router.get('/files-group',
is_superAdmin, 
authValidation.groupIdValidation,
adminController.getFilesForGroup);

router.get('/users',
is_superAdmin,
adminController.getAllUsers);

router.get('/groups-user',
is_superAdmin,
authValidation.userIdValidation,
adminController.getGroupsForUser);

router.get('/report-user',
is_superAdmin,
authValidation.userIdValidation,
adminController.getReportForUser)

module.exports = router ;