const {body , query} = require('express-validator');
const validatorResult = require('../validatorResult');

exports.createFileValidation = [
    body('name').trim()
    .notEmpty().withMessage('file name is required')
    .isString().withMessage('file name must be string'),

    body('groupId').trim()
    .notEmpty().withMessage('groupID is required')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
    
    validatorResult
]

exports.fileIdValidation = [
    query('fileId').trim()
    .notEmpty().withMessage('file id is required')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

    validatorResult
]