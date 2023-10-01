const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
    phoneNumber: '0716210475',
    message: 'This is a sample message'
}

const job = queue.create('push_notification_code', jobData);

job.on('enqueue', () => {
    console.log(`Notification Job created: ${job.id}`);
});

job.on('complete', () => {
    console.log('Notification Job completed');
});

job.on('failed', () => {
    console.log('Notification Job failed');
});

job.save();
