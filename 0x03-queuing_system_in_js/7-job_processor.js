const kue = require('kue');
const {job} = require("kue/lib/http/routes/json");
const queue = kue.createQueue();

const blocked_numbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100);

    if (blocked_numbers.includes(phoneNumber)) {
        const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
        done(new Error(errorMessage));

        console.log(errorMessage);
    } else {
        job.progress(50, 100);

        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

        setTimeout(() => {
            job.progress(100, 100);
            done();
        }, 3000);
    }
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;

    sendNotification(phoneNumber, message, job, done);
});

queue.on('error', (error) => {
    console.log('Queue error:', error);
});