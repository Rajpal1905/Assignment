const { getChannel } = require('../config/rabbitmq');
const { processRequest } = require('./requestProcessor');

const startWorker = async () => {
    const channel = getChannel();
    
    try {
        const queueName = 'request_queue';

        channel.assertQueue(queueName, { durable: true });
        console.log(`Worker listening on ${queueName}...`);

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const requestData = JSON.parse(msg.content.toString());

                try {
                    await processRequest(requestData);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Failed to process request:', error);
                }
            }
        });
    } catch (err) {
        console.error('Worker error:', err);
    }
};

module.exports = startWorker;
