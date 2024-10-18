const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Use the routes
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});