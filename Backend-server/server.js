const express = require('express');
const cors = require('cors');
const mongoose = require('./database/db'); // Ensure DB connection on app start

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Use Express's built-in middleware

// Import routes
const eventRoutes = require('./routes/eventRoutes'); // Assuming you'll create this

app.use('/api/events', eventRoutes);

app.listen(PORT, () => console.log(`Server kører på port ${PORT}`));