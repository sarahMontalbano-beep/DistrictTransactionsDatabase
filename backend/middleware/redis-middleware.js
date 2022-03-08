const redis = require('redis');

class RedisMiddleware {

    async clientSetup(req, res, next) {
        if (!res.locals.redisClient) {
            res.locals.redisClient = await redis.createClient();
            // client.connect().then(c => res.locals.redisClient = c);
        }
        next();
    }

    static clientCleanup(req, res, next) {
        res.on('finish', () => {
            if (res.locals.redisClient) {
                res.locals.redisClient.quit();
                delete res.locals.redisClient;
            }
        });
        next();
    }
}

module.exports = {RedisMiddleware};