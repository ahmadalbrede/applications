const sequelize = require('../util/database');

const withTransactionAspect = (serviceFunction, settings = {}) => {
    const { before, after, onException } = settings;
    return async (req, res, next) => {
        let transaction;
        try {
            if (before) await before(req);

            // transaction = await sequelize.transaction();
            // req.transaction = transaction;

            const result = await serviceFunction(req, res, next);
            // await transaction.commit();

            if (after) await after(req, result);

        } catch (err) {
            if (transaction) await transaction.rollback();

            if (onException) await onException(req, err);

            return next(err);
        }
    };
};

module.exports = withTransactionAspect;