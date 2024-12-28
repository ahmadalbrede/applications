const sequelize = require('../util/database');
// const File = require('../models/File');

async function withTransactionAspect(fn, ...args) {
  const transaction = await sequelize.transaction();
  try {
    console.log('Transaction started:', transaction.id);
    const result = await fn(transaction, ...args);
    await transaction.commit();
    console.log('Transaction committed:', transaction.id);
    return result;
  } catch (error) {
    await transaction.rollback();
    console.error('Transaction rolled back:', transaction.id, error);
    throw error;
  }
}
//   async function withTransaction(fn, hooks = {}) {
//     const { before, after, onException } = hooks;
//     const transaction = await File.sequelize.transaction();
  
//     try {
//       if (before) {
//         await before(transaction);
//       }
//       const result = await fn(transaction);

//       await transaction.commit();
  
//       if (after) {
//         await after(result, transaction);
//       }
  
//       return result;
//     } catch (error) {
//       await transaction.rollback();
  
//       if (onException) {
//         await onException(error, transaction);
//       }
  
//       throw error;
//     }
//   }
// async function beforeHook(transaction) {
//     console.log('Transaction started:', transaction.id);
//   }
  
//   async function afterHook(result, transaction) {
//     console.log('Transaction succeeded:', transaction.id);
//     console.log('Result:', result);
//   }
  
//   async function onExceptionHook(error, transaction) {
//     console.error('Transaction failed:', transaction.id);
//     console.error('Error:', error.message);
//   }
module.exports = withTransactionAspect;