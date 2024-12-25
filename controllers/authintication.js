// const User = require('../models/User');
const userService = require('../service/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const {userService} = require('../util/autoWrapService')

exports.register = (req , res , next )=>{

    userService.register(req.body)
    .then(result => {
        return res.status(201).json(result);
    })
    .catch(err => {
        next(err);
    })
};

exports.login = (req , res , next)=>{
    userService.login(req.body)
    .then(result =>{
        return res.status(200).json(result);
    })
    .catch(err=>{
        next(err);
    })
}