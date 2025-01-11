const express = require('express');
const router = express.Router();
const is_auth = require('../middleware/is_auth');
const backupController = require('../controllers/backupController');
const {getBackupValidation} = require('../util/validations/backupValidation');

router.get('/get',
is_auth,
getBackupValidation ,
backupController.getAllBackupForFill
);

router.get('/download',
is_auth,
backupController.downloadBackup
);



module.exports = router ;