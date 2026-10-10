const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const winston = require('winston');

const app = express();
const port = process.env.PORT || 3000;
const logDirectory = path.join(__dirname, 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${level.toUpperCase()} ${timestamp} ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, 'app.log'),
      level: 'info'
    })
  ]
});

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  logger.info(`Incoming ${req.method} request to ${req.originalUrl} - timestamp: "${timestamp}"`);
  next();
});

app.use(morgan('tiny', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(morgan('combined', {
  stream: accessLogStream
}));

const orders = [
  {
    id: 1,
    customer: 'Alice',
    item: 'Apple',
    quantity: 6
  },
  {
    id: 2,
    customer: 'Bob',
    item: 'Banana',
    quantity: 3
  }
];

app.get('/orders', (req, res) => {
  logger.info('Fetched all orders');
  res.status(200).json(orders);
});

app.post('/orders', (req, res) => {
  const { customer, item, quantity } = req.body || {};

  if (!customer || !item || quantity === undefined || quantity === null) {
    const message = 'Invalid order: Missing fields.';
    logger.error(message);
    return res.status(400).json({ message });
  }

  const newOrder = {
    id: orders.length + 1,
    customer,
    item,
    quantity,
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  logger.info(`Order placed successfully: ${JSON.stringify(newOrder)}`);

  res.status(201).json({
    message: 'Order placed successfully',
    order: newOrder
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(port, () => {
  logger.info(`Order management server running on port ${port} (timestamp: "${new Date().toISOString()}")`);
});

module.exports = app;
