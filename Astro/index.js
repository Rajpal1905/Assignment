const express = require('express');
const routes = require('./routes/Route');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// DB connection
require('./config/dbConnection').dbConnection();

// Routes
app.use('/api/v1', routes);

// Only start the server if not in the test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App is running at PORT number ${PORT}...`);
  });
}

app.get('/', (req, res) => {
  res.send("default browser");
});

// Export the app for use in testing
module.exports = app;
