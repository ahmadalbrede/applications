const {body , query,param} = require('express-validator');
const validatorResult = require('../validatorResult');

exports.sendValidation = [
    body('userId').trim()
    .notEmpty().withMessage('groupID is required')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

    validatorResult
]

exports.acceptValidation = [
    param('invitationId').trim()
    .notEmpty().withMessage('groupID is required')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

    validatorResult
]