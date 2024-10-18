const express = require('express');
const router = express.Router();
const transactionRoutes = require('./transactions');
const statisticsRoutes = require('./statistics');

router.use(transactionRoutes);
router.use(statisticsRoutes);

module.exports = router;
