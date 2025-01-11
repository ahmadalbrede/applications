const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const is_auth = require('../middleware/is_auth');
const is_admin = require('../middleware/is_admin.js');

router.get('/file',
is_auth ,
reportController.getReportForMember);

router.get('/user' ,
is_auth,
is_admin,
reportController.getReportToUser)



module.exports = router ;