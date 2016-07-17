var router = require('express').Router();
var authMiddleware = require('../../middleware/auth-rest');

// Services
router.use('/v1/posts', authMiddleware, require('./post'));

// Authentication
router.use('/auth', require('./auth'));

// Additional error handler for RESTful services
router.use(require('../../middleware/error-rest-handler'));

module.exports = router;
