import {
  getTransactionsByDay,
  sortByDate
} from '../helpers/groupTransactionsByDay';
import { TransactionStatus } from '../types';
import {
  aggregatedTransactionsSample,
  transactionsSample,
  transactionStatusesSample
} from './data/transactions';

describe('sortByDate', () => {});

describe('getCustomerTransactions', () => {
  it('should return aggregated transactions for a customer', () => {
    const groupedByDayTransactions = getTransactionsByDay(
      aggregatedTransactionsSample
    );
    expect(groupedByDayTransactions).toHaveLength(3);
    expect(groupedByDayTransactions[0].date).toBe('2022-09-10');
    expect(groupedByDayTransactions[0].total).toBe(143.21);
    expect(groupedByDayTransactions[1].transactions.length).toBe(2);
  });

  // it('should return an empty array if no transactions for the customer', () => {
  //   const aggregatedTransactions = getCustomerTransactions(
  //     transactionsSample,
  //     3
  //   );
  //   expect(aggregatedTransactions).toHaveLength(0);
  // });
});
