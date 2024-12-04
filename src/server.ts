import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import getCustomerTransactions from './helpers/getCustomerTransactions';
import getCustomerRelations from './helpers/getCustomerRelations';
import winston from 'winston';
import groupTransactionsByDay from './helpers/groupTransactionsByDay';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

dotenv.config();

const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

const port = 3000;

app.get('/v1/:customerId/transactions', async (req, res) => {
  const { customerId } = req.params;

  try {
    if (!process.env.TRANSACTIONS_API_URL)
      throw new Error('TRANSACTIONS_API_URL is not defined');

    const response = await axios.get(process.env.TRANSACTIONS_API_URL);

    const transactions = getCustomerTransactions(
      response.data,
      Number(customerId)
    );

    res.json({ transactions });
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ error });
  }
});

app.get('/v1/:customerId/transactions/daily', async (req, res) => {
  const { customerId } = req.params;

  try {
    if (!process.env.TRANSACTIONS_API_URL)
      throw new Error('TRANSACTIONS_API_URL is not defined');

    const response = await axios.get(process.env.TRANSACTIONS_API_URL);

    const transactions = getCustomerTransactions(
      response.data,
      Number(customerId)
    );

    const groupedByDayTransactions = groupTransactionsByDay(transactions);

    res.json(groupedByDayTransactions);
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ error });
  }
});

app.get('/v1/:customerId/relations', async (req, res) => {
  const { customerId } = req.params;

  try {
    if (!process.env.TRANSACTIONS_API_URL)
      throw new Error('TRANSACTIONS_API_URL is not defined');

    const response = await axios.get(process.env.TRANSACTIONS_API_URL);

    const transactions = getCustomerRelations(
      response.data,
      Number(customerId)
    );

    res.json({ transactions });
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ error });
  }
});

app.listen(port, () => logger.info(`Server is running on port ${port}`));
