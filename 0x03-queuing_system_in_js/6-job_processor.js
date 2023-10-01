const kue = require('kue');
const queue = kue.createQueue();

function sendNotifications(phoneNumber, message) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification_code', (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotifications(phoneNumber, message);

    done();
});

queue.on('error', (error) => {
    console.log('Queue error:, ', error);
});