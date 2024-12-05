const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUsers = async()=>{
    try{
        return await User.findAll();
    }
    catch(err){
        throw err ;
    }
}

exports.getUser = async(email)=>{
    try{
        return await User.findOne({where : { email : email }});
    }
    catch(err){
        throw err;
    }
}

exports.createUser = async(data)=>{
    try{
        const {name , email , password} = data.body;
        const hashPassword = await bcrypt.hash(password , 12) ;
        return await User.create({
            name : name ,
            email : email ,
            password : hashPassword
        });
    }
    catch(err){
        console.log('the service errrir irriririririiririri');
        throw err;
    }
}