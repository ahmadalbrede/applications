const express = require('express');
const router = express.Router();

const is_auth = require('../middleware/is_auth');
const is_admin = require('../middleware/is_admin');
const fileController = require('../controllers/fileController');
const {createFileValidation , fileIdValidation} = require('../util/validations/fileValidation')
const {groupIdValidation} = require('../util/validations/authValidation')
const withTransactionAspect = require('../middleware/withTransactionAspect');

const transactionSettings = {
    before: async (req) => {
        console.log('Before: Validating request data...');
    },
    after: async (req, result) => {
        console.log('After: Successfully completed the operation...');
    },
    onException: async (req, err) => {
        console.error('Exception: Error occurred...');
        console.error(err.message);
    },
};

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
fileController.checkInMultipleFile,
// withTransactionAspect(fileController.checkInMultipleFile,transactionSettings)
);

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