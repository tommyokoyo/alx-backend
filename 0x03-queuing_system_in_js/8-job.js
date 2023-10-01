const kue = require('kue');
const queue = kue.createQueue();

function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }

    jobs.forEach((jobData) => {
        const notificationJob = queue.create('push_notification_code_3', jobData);

        notificationJob.on('enqueue', () => {
            console.log(`Notification job created: ${notificationJob.id}`);
        });

        notificationJob.on('complete', () => {
            console.log(`Notification job ${notificationJob.id} completed`);
        });

        notificationJob.on('failed', (errorMessage) => {
            console.error(`Notification job ${notificationJob.id} failed: ${errorMessage}`);
        });

        notificationJob.on('progress', (progress, data) => {
            console.log(`Notification job ${notificationJob.id} ${progress} complete`);
        });

        notificationJob.save();

    });
}