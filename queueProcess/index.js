const express = require('express');
const userRouter = require('./Routes/userRoute');  

const app = express();

require('dotenv').config();

require('./config/DbConnection').dbConnection()

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/v1/auth', userRouter);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        msg: "Your server is up and running!"
    });
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
