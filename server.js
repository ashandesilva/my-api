require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const artistRoutes = require('./routes/artist')

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/songs', songRoutes);
app.use('/artist', artistRoutes);

// Add any additional routes as needed

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});