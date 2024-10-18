const Transaction = require('../models/Transaction');


exports.getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    const query = {
        dateOfSale: { $regex: `-${month.padStart(2, '0')}-`, $options: 'i' } // Filter by month
    };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];

        const parsedPrice = parseFloat(search);
        if (!isNaN(parsedPrice)) {
            query.$or.push({ price: parsedPrice });
        }
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

    
        const total = await Transaction.countDocuments(query);

    
        res.json({ total, transactions });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getCombinedData = async (req, res) => {
    const { month } = req.query;

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $regex: `-${month.padStart(2, '0')}-`, $options: 'i' }
        });

        const totalSaleAmount = transactions.reduce((sum, t) => sum + (t.sold ? t.price : 0), 0);
        const totalSoldItems = transactions.filter(t => t.sold).length;
        const totalNotSoldItems = transactions.filter(t => !t.sold).length;

        const statistics = {
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        };

        res.json({ statistics, transactions });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

