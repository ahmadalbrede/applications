// const User = require('../models/User');
// const userService = require('../service/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {userService} = require('../util/autoWrapService')

exports.register = (req , res , next )=>{

        userService.createUser(req ,res , next )
        .then(result => {
            return res.status(201).json({
                message : "register successfuly",
                userId : result.id
            })
        })
        .catch(err => {
            // console.log('controllllller error ',err);
            next(err);
        });
}

exports.login = (req, res, next)=> {
    const {email , password } = req.body ;
    userService.getUser(email)
    .then(user => {
        if(!user){
            const error = new Error('this email not found');
            error.statusCode = 401 ;
            throw error ;
        }
        bcrypt.compare(password , user.password)
        .then(isValid => {
            if(!isValid){
                const error = new Error('invaild credentials');
                error.statusCode = 401 ;
                throw error ;
            }
            const token = jwt.sign({id : user.id},'secretkey');
            return res.status(200).json({
                message : 'successfuly',
                userId : user.id , 
                token : token
            });
        })
    })
    .catch(err => {
        next(err);
    });
}

    // const {name , email , password}= req.body;
    // userService.getUser(email)
    //     .then(user => {
    //     if(user){
    //         const error = new Error('this email is already exists');
    //         error.statusCode = 422 ;
    //         throw error ;
    //     }
        // return bcrypt.hash(password , 12)
        // .then(hashPassword => {
        //     userService.createUser({
        //         name : name,
        //         email : email,
        //         password : hashPassword
        //     }).then(result => {
        //         const token = jwt.sign({id : result.id},'secretkey');
        //         return res.status(201).json({
        //             userId : result.id,
        //             token : token
        //         })
        //     })
        // })