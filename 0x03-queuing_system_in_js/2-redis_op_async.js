import { promisify } from "util";

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

const displaySchoolValue = async (schoolName) => {
    const getAsync = promisify(client.get).bind(client);
    try {
        const value = await getAsync(schoolName);
        console.log(`Value for ${schoolName} is: ${value}`);
    } catch (error) {
        console.error(error);
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');