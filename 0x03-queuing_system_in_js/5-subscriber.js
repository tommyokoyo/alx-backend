const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Listen for the 'connect' event
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Listen for the 'error' event
client.on('error', (error) => {
    console.error(`Redis client not connected to the server: ${error.message}`);
});

client.subscribe('holberton school channel');

client.on('message', (channel, message) => {
    console.log(`Message received on channel ${channel}: ${message}`);

    if (message === 'KILL_SERVER') {
        client.unsubscribe();
        client.quit();
    }
});