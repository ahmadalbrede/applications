const groupService = require('../service/groupService')

const adminAspect = {
    before: async (args, serviceName, methodName) => {
        const [req] = args;

        const groupId = req.body.groupId;

        if (!groupId) {
            throw new Error('Group ID is required.');
        }

        const result = await groupService.getGroup(groupId);

        if (result.adminId !== req.user.id) {
            const error = new Error('Permission denied');
            error.statusCode = 403;
            throw error;
        }

        console.log(`User authorized for ${serviceName}.${methodName}`);
    },

    after: async (result, args, serviceName, methodName) => {
        console.log(`Execution completed for ${serviceName}.${methodName}`);
        console.log(`Result:`, result);
    },

    onException: async (error, args, serviceName, methodName) => {
        console.error(`Error in ${serviceName}.${methodName}:`, error.message);
    },
};

module.exports = adminAspect;