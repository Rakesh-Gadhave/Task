const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const connectDB = require('../config/db');

const seedData = async () => {
    try {
        await connectDB();
        // please add this link below in axios.get()'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
        const { data } = await axios.get();
        await Transaction.insertMany(data);
        console.log('Data seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
