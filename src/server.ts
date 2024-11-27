import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import getCustomerTransactions from './helpers/getCustomerTransactions';
import getCustomerRelations from './helpers/getCustomerRelations';

dotenv.config();

const app = express();
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
    console.error(error); // log error
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
    console.error(error); // log error
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
