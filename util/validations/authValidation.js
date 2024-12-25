const {body , query} = require('express-validator');
const validatorResult = require('../validatorResult');
const userRepository = require('../../repositories/userRepository');

exports.registerValidation = [
    body('name').trim()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name must be string'),

    body('email').trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('the email format is not correct')
    .custom(async (value)=>{
        const user = await userRepository.getUserByEmail(value);
            if(user){
                throw new Error('this email is already in use')
            }
    } )
    .withMessage('this email is already exist')
    ,
    body('password').trim()
    .notEmpty().withMessage('password is required')
    .isString().withMessage('password must be string')
    .isLength({max : 20}).withMessage('password is too long')
    .isLength({min : 8 }).withMessage('password is too short'),
    validatorResult
];

exports.loginValidation = [
    body('email').trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('email format is not correct'),

    body('password').trim()
    .notEmpty().withMessage('password is required')
    .isString().withMessage('password must be string')
    .isLength({max : 20}).withMessage('password is too long')
    .isLength({min : 8 }).withMessage('password is too short'),
    validatorResult
];

exports.groupIdValidation = [
    query('groupId').trim()
    .notEmpty().withMessage('groupID is required')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

    validatorResult
]

