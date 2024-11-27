import {
  getCustomerTransactions,
  getTimeline,
  sortByStatus
} from '../helpers/getCustomerTransactions';
import { TransactionStatus } from '../types';
import {
  transactionsSample,
  transactionStatusesSample
} from './data/transactions';

describe('sortByStatus', () => {
  it('should sort transactions by status', () => {
    const sortedTransactions = [...transactionStatusesSample].sort(
      sortByStatus
    );
    expect(sortedTransactions[0].transactionStatus).toBe(
      TransactionStatus.RETURNED
    );
    expect(sortedTransactions[1].transactionStatus).toBe(
      TransactionStatus.SETTLED
    );
    expect(sortedTransactions[2].transactionStatus).toBe(
      TransactionStatus.PENDING
    );
  });
});

describe('getTimeline', () => {
  it('should return a timeline of transactions', () => {
    const timeline = getTimeline(transactionStatusesSample);

    expect(timeline).toEqual([
      {
        createdAt: '2022-09-06T15:41:42+00:00',
        status: TransactionStatus.SETTLED,
        amount: -143.21
      },
      {
        createdAt: '2022-09-10T15:41:42+00:00',
        status: TransactionStatus.RETURNED,
        amount: 143.21
      },
      {
        createdAt: '2022-09-05T11:36:42+00:00',
        status: TransactionStatus.PENDING,
        amount: -143.21
      }
    ]);
  });

  it('should return an empty array if no transactions', () => {
    const timeline = getTimeline([]);
    expect(timeline).toHaveLength(0);
  });
});

describe('getCustomerTransactions', () => {
  it('should return aggregated transactions for a customer', () => {
    const aggregatedTransactions = getCustomerTransactions(
      transactionsSample,
      1
    );
    expect(aggregatedTransactions).toHaveLength(4);
    expect(aggregatedTransactions[0].authorizationCode).toBe('F10000');
    expect(aggregatedTransactions[0].timeline).toHaveLength(2);
    expect(aggregatedTransactions[0].timeline[0].status).toBe('SETTLED');
    expect(aggregatedTransactions[0].timeline[1].status).toBe('PENDING');
  });

  it('should return an empty array if no transactions for the customer', () => {
    const aggregatedTransactions = getCustomerTransactions(
      transactionsSample,
      3
    );
    expect(aggregatedTransactions).toHaveLength(0);
  });
});
