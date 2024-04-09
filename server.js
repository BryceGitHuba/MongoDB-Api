const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetworkdb');

mongoose.set('debug', true);

// Import routes
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));