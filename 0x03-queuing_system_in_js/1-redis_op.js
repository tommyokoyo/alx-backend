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

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
    client.get(schoolName, (error, value) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Value for ${schoolName}: ${value}`);
        }
    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');