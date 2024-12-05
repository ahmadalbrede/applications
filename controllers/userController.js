const User = require('../models/User');
const userService = require('../service/userService');

exports.getUsers = (req , res , next )=> {
    userService.getUsers()
    .then(users => {
        return res.status(200).json({
            users : users
        });
    })
    .catch(err => console.log(err)); 
}
