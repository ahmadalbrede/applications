const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');


exports.register = async(data)=>{
    try{
        const hashPassword = await bcrypt.hash(data.password , 12,);
        const user =  await userRepository.createUser({
            name : data.name,
            email : data.email,
            password : hashPassword 
        });
        const token = jwt.sign({id : user.id},'secretkey',
        // {expiresIn: '1h'}
        );
        return {
            token : token ,
            userId : user.id 
        }

    }
    catch(error){
        throw error ; 
    }
}

exports.login = async(data)=>{
    try{
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            const error = new Error('this email not found');
            error.statusCode = 401 ;
            throw error ;
        }
        const validPassword = await bcrypt.compare(data.password , user.password);
        if(validPassword){
            const token = jwt.sign({id : user.id},'secretkey',
            // {expiresIn: '1h'}
            );
            return {
                message : 'successfuly',
                userId : user.id,
                token : token
            }
        }
        const error = new Error('invaild credentials');
        error.statusCode = 401 ;
        throw error ;
    }
    catch(err){
        throw err ; 
    }
}

exports.getUsers = async()=>{
    try{
        return await userRepository.getAllUser();
    }
    catch(err){
        throw err ; 
    }
}

exports.getUserByName = async(name)=>{
    try{
        return await userRepository.getUserByName(name);
    }
    catch(err){
        throw err ;
    }
}

exports.getUsersForSendInvitation = async(groupId)=>{
    try{
        return await userRepository.getUserForSendInvitation(groupId);
    }
    catch(err){throw err}
}
///////////////////////////////////////////////////////////////////////////////

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