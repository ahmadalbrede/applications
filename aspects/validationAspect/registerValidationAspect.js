const {registerValidation} = require('../../util/validations/authValidation');
const validationResult = require('../../util/validatorResult')

const registerValidationAspect = {
    before: async (args, serviceName, methodName) => {
        if (methodName === 'createUser') {
            const [req, res, next] = args;
            try {
                for (const validation of registerValidation) {
                    await validation(req, res, next);
                }
            } catch (err) {
                console.error(`Validation error in ${serviceName}.${methodName}:`, err.message);
                next(err);
            }
        }
        
    },
    after: async (result, args, serviceName, methodName) => {
        if (methodName === 'createUser') {
            console.log(`Validation completed for ${serviceName}.${methodName}`);
        }
    },
    onException: async (error, args, serviceName, methodName) => {
        // if (methodName === 'createUser') {
            console.error(`Validation error in ${serviceName}.${methodName}:`, error.message);
            const [req, res, next] = args;
            next(error)
            // throw error;
        // }
    },
};

module.exports = registerValidationAspect;