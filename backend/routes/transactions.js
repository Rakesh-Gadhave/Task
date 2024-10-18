const express = require('express');
const router = express.Router();
const { getTransactions, getCombinedData } = require('../controllers/transactionController');

router.get('/transactions', getTransactions);
router.get('/combined', getCombinedData);

module.exports = router;
