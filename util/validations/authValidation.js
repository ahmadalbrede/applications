const {body} = require('express-validator');
const validatorResult = require('../validatorResult');
const userService = require('../../service/userService');

exports.registerValidation = [
    body('name').trim()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name must be string'),

    body('email').trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('the email format is not correct')
    .custom((value)=>{
        userService.getUser(value)
        .then(user =>{
            if(user){
                throw new Error('this email is already in use')
            }
            else{
                return true ;
            }
        })
    } ),
    // .custom(async (value, { req }) => {
    //     const user = await userService.getUser(value);
    //     if (user) {

    //         // return Promise.reject('This email is already in use.');
    //         throw new Error('This email is already in use.')
    //     }
    
    // }),

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

