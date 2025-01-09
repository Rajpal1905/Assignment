const express = require('express');

require('dotenv').config()


const { connectRabbitMQ } = require('./config/rabbitmq');
const userRouter = require('./Routes/userRoutes');
const queueRouter = require('./Routes/queueRoutes');
const startWorker = require('./service/worker');

const app = express();

app.use(express.json());
require('./config/DbConnection').dbConnection()
connectRabbitMQ().then(() => startWorker());

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/queue', queueRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
