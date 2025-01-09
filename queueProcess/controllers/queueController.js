const { getChannel } = require('../config/rabbitmq');

exports.enqueueRequest = async (req, res) => {
    const { userId, data } = req.body;

    try {
        const channel = getChannel();
        const queueName = `queue_${userId}`;

        channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });

        return res.status(200).json({ message: 'Request added to the queue' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Queueing failed', error: err.message });
    }
};
