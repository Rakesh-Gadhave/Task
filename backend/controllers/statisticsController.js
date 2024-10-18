const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `-${month.padStart(2, '0')}-`, $options: 'i' } };

    const transactions = await Transaction.find(query);
    const totalSaleAmount = transactions.reduce((sum, t) => sum + (t.sold ? t.price : 0), 0);
    const totalSoldItems = transactions.filter(t => t.sold).length;
    const totalNotSoldItems = transactions.filter(t => !t.sold).length;

    res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
};

exports.getBarChart = async (req, res) => {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `-${month.padStart(2, '0')}-`, $options: 'i' } };

    const transactions = await Transaction.find(query);
    const priceRanges = [
        { range: '0-100', count: 0 },
        { range: '101-200', count: 0 },
        { range: '201-300', count: 0 },
        { range: '301-400', count: 0 },
        { range: '401-500', count: 0 },
        { range: '501-600', count: 0 },
        { range: '601-700', count: 0 },
        { range: '701-800', count: 0 },
        { range: '801-900', count: 0 },
        { range: '901-above', count: 0 }
    ];

    transactions.forEach(transaction => {
        const { price } = transaction;
        if (price <= 100) priceRanges[0].count++;
        else if (price <= 200) priceRanges[1].count++;
        else if (price <= 300) priceRanges[2].count++;
        else if (price <= 400) priceRanges[3].count++;
        else if (price <= 500) priceRanges[4].count++;
        else if (price <= 600) priceRanges[5].count++;
        else if (price <= 700) priceRanges[6].count++;
        else if (price <= 800) priceRanges[7].count++;
        else if (price <= 900) priceRanges[8].count++;
        // More conditions...
        else priceRanges[priceRanges.length - 1].count++;
    });

    res.json(priceRanges);
};

exports.getPieChart = async (req, res) => {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `-${month.padStart(2, '0')}-`, $options: 'i' } };

    const transactions = await Transaction.find(query);
    const categoryCounts = {};

    transactions.forEach(transaction => {
        const { category } = transaction;
        if (category in categoryCounts) categoryCounts[category]++;
        else categoryCounts[category] = 1;
    });

    const pieData = Object.entries(categoryCounts).map(([category, count]) => ({ category, count }));

    res.json(pieData);
};
