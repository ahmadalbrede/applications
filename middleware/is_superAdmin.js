const jwt = require('jsonwebtoken'); 

module.exports = (req , res , next)=>{
    const authHeader = req.headers["authorization"] ; 
    if (!authHeader){
        return res.status(401).json('toekn is required');
    }
    const token = authHeader
    // .split(' ')[1];
    let decodedToken ;
    try{
        decodedToken =  jwt.decode(token , 'secretkey')
        if(!decodedToken){
            // throw new Error('not')
            return res.status(401).json('not authentication');
        }
        console.log(decodedToken);
    
        // req.user = decodedToken ; 
        console.log(`${!decodedToken.admin}`)
        if(!decodedToken.admin){
            return res.status(401).json('not authentication');
        }
        // console.log(req.user);
        next();
    }
    catch(err){
        console.log(err);
        next(err);
    }
    
}