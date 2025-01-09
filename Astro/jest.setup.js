// jest.setup.js or in your test suite setup
const mongoose = require('mongoose');

// Ensure that the database connection is established before tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Ensure that the database connection is closed after tests
afterAll(async () => {
  await mongoose.connection.close();
});
