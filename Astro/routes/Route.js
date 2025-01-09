const { createAstro } = require('../controller/createAstro');
const { distribute, adjustFlow } = require('../controller/flowControl');

const router = require('express').Router();

router.post('/create-astro',createAstro)

router.post('/distribute-user',distribute)
router.post('/flow-adjustment',adjustFlow)

module.exports = router;