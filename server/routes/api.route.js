const express = require('express');
const router = express.Router();

// Categories Route
require('./category.route')(router);
require('./expense.route')(router);

module.exports = router;