const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');
const is_auth = require('../middleware/is_auth');
const groupValidation = require('../util/validations/gorupValidation');
// const authAspect = require('../aspects/authAspect');
// const applyAspect = require('../util/applyAspect');
// const getGroupsForUser = applyAspect(groupController.getGroupsForUser , {
//     before : authAspect.before
// });
router.post('/create',
is_auth,
groupValidation.createGroupValidation,
groupController.createGroup);

router.get('/view',
// getGroupsForUser);
// is_auth ,
// authAspect.applyBeforeController(groupController.getGroupsForUser));
groupController.getGroupsForUser);

router.get('/getgroups', groupController.getGroups);

module.exports = router ;