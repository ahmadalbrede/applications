const {body} = require('express-validator');
const validatorResult = require('../validatorResult');

exports.createGroupValidation = [
    body('name').trim()
    .notEmpty().withMessage('group name is required')
    .isString().withMessage('group name must be string')
    .isLength({max : 30}).withMessage('group name is too long')
    .isLength({min : 1}).withMessage('group name is too short'),
    validatorResult
];
