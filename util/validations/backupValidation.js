const {body , query} = require('express-validator');
const validatorResult = require('../validatorResult');

exports.getBackupValidation = [
    query('fileId').trim()
    .notEmpty().withMessage('fileId is required')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

    validatorResult
];