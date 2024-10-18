const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    title : String,
    price: Number,
    description : String,
    category : String,
    sold : Boolean,
    dateOfSale : String,
    image : String
});

module.exports = mongoose.model('Transaction', transactionSchema);