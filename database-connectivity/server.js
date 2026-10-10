const express = require('express');
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate product number detected.' });
  }

  return res.status(500).json({ message: 'Something went wrong on the server.' });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
module.exports = app;
