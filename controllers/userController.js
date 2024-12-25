// const User = require('../models/User');
const userService = require('../service/userService');

exports.getUsers = (req , res , next)=>{
    userService.getUsers()
    .then(result => {
        return res.status(200).json(result);
    }).catch(err => next(err));
}

exports.searchUser = (req , res , next)=>{
    userService.getUserByName(req.body.name)
    .then(result => {
        return res.status(200).json({
            user : result 
        });
    }).catch(err => next(err));
}