const {validationResult} = require('express-validator');

const validatorResult = (req , res , next )=> {
    const errors = validationResult(req); 
    if(errors.isEmpty()){
        return next();
    }
    console.log(errors.array());
    return res.status(422).json(errors.array()); 
};

module.exports = validatorResult ; 