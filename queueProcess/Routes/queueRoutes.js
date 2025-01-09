const express = require('express');
const { enqueueRequest } = require('../controllers/queueController');
const { authMiddleware } = require('../middleware/Auth');

const router = express.Router();

router.post('/enqueue', authMiddleware, enqueueRequest);

module.exports = router;
