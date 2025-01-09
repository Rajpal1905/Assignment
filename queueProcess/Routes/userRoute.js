const { signin, signup } = require('../controllers/userController')

const router = require('express').Router()

router.post('/register',signup)
router.post('/login',signin)

module.exports = router