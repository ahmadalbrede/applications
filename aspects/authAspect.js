const jwt = require('jsonwebtoken');

const authAspect = {
    before: (args, serviceName, methodName) => {
        const [req] = args; 
        if (!req.headers["authorization"]) {
            throw new Error("Token is required!");
        }

        const token = req.headers["authorization"];
        let decodedToken;
        try {
            decodedToken = jwt.decode(token, 'secretkey');
        } catch (err) {
            console.error("Error decoding token:", err);
            throw new Error("Invalid Token!");
        }

        if (!decodedToken) {
            throw new Error("Not authenticated!");
        }

        req.user = decodedToken; 
        console.log(`User authenticated for ${serviceName}.${methodName}`);
    },
    
    after: (result, args, serviceName, methodName) => {
        console.log(`After ${serviceName}.${methodName}`);
        console.log("Result:", result);
    },

    onException: (error, args, serviceName, methodName) => {
        console.error(`Exception in ${serviceName}.${methodName}`);
        console.error("Error message:", error.message);
    },
};

module.exports = authAspect ; 