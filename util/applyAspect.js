
const applyAspect = (service, aspect) => {
    return new Proxy(service, {
        get(target, prop) {
            if (typeof target[prop] === 'function') {
                return async function (...args) {
                    try {
                        if (aspect.before) {
                            await aspect.before(args, target.constructor.name, prop);
                        }

                        const result = await target[prop](...args);

                        if (aspect.after) {
                            await aspect.after(result, args, target.constructor.name, prop);
                        }

                        return result;
                    } catch (error) {

                        if (aspect.onException) {
                            await aspect.onException(error, args, target.constructor.name, prop);
                        }   
                            throw error;
                    }
                };
            }
            return target[prop];
        },
    });
};

module.exports = applyAspect;
