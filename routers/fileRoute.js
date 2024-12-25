const express = require('express');
const router = express.Router();

const is_auth = require('../middleware/is_auth');
const is_admin = require('../middleware/is_admin');
const fileController = require('../controllers/fileController');
const {createFileValidation , fileIdValidation} = require('../util/validations/fileValidation')
const {groupIdValidation} = require('../util/validations/authValidation')
router.post('/add',
is_auth,
createFileValidation,
fileController.addFile);

router.get('/get',
is_auth,
groupIdValidation,
fileController.getFilesForGroup);

router.get('/download',
is_auth,
fileIdValidation,
fileController.downloadFile)

router.delete('/delete',
is_auth,
fileIdValidation,
fileController.deleteFile)

router.put('/check-in',
is_auth,
fileIdValidation,
fileController.checkInFile)

router.put('/check-out',
is_auth,
fileIdValidation,
fileController.updateFile)

router.put('/check-in-multiple',
is_auth,
fileController.checkInMultipleFile);

router.get('/not-accept',
is_auth,
groupIdValidation,
is_admin,
fileController.getFilesNotAccept);

router.put('/accept',
is_auth,
fileIdValidation,
fileController.acceptFile)

module.exports = router ;