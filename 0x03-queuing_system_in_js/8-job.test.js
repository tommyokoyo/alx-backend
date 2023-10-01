const { createPushNotificationsJobs, queue } = require('./8-job');
const { expect } = require('chai');

describe('createPushNotificationsJobs', () => {
    before(() => {
        // Enter the test mode without processing jobs
        queue.testMode.enter();
    });

    afterEach(() => {
        // Clear the queue after each test
        queue.testMode.clear();
    });

    after(() => {
        // Exit the test mode and clean up after all tests
        queue.testMode.exit();
    });

    it('should create and enqueue jobs', () => {
        const jobsArray = [
            { phoneNumber: '1234567890', message: 'Message 1' },
            { phoneNumber: '9876543210', message: 'Message 2' },
        ];

        createPushNotificationsJobs(jobsArray, queue);

        // Get all jobs from the queue
        const jobs = queue.testMode.jobs;

        // Assert that the number of jobs in the queue is equal to the number of input jobs
        expect(jobs).to.have.lengthOf(jobsArray.length);

        // Loop through jobs and assert their properties
        jobsArray.forEach((jobData, index) => {
            const job = jobs[index];
            expect(job.type).to.equal('push_notification_code_3');
            expect(job.data).to.deep.equal(jobData);
        });
    });

    it('should throw an error if jobs is not an array', () => {
        const invalidJobs = 'Not an array';

        // Wrap the function call in a function to test the error throwing
        const testFunction = () => createPushNotificationsJobs(invalidJobs, queue);

        // Assert that calling the function with invalidJobs throws an error
        expect(testFunction).to.throw('Jobs is not an array');
    });
});