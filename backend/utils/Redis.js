const redis = require('redis');

const client = redis.createClient({
    password: 'U715gX55MuwMzLbryEnz99lPdrZLtIcQ',
    socket: {
        host: 'redis-17934.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 17934
    }
});
 
client.connect();
client.on('connect', () => {
    console.log('Redis client connected');
})
module.exports = client;
