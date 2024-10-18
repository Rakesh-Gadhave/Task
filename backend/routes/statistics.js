const express = require('express');
const router = express.Router();
const { getStatistics, getBarChart, getPieChart } = require('../controllers/statisticsController');

router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);

module.exports = router;
