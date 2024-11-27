import {
  AggregatedTransaction,
  Timeline,
  Transaction,
  TransactionStatus
} from '../types';

const STATUS_ORDER = [
  TransactionStatus.PENDING,
  TransactionStatus.SETTLED,
  TransactionStatus.RETURNED
];

export function sortByStatus(a: Transaction, b: Transaction): number {
  return (
    STATUS_ORDER.indexOf(b.transactionStatus) -
    STATUS_ORDER.indexOf(a.transactionStatus)
  );
}

export function getTimeline(transactions: Transaction[]): Timeline {
  return transactions.map(({ transactionDate, transactionStatus, amount }) => ({
    createdAt: transactionDate,
    status: transactionStatus,
    amount
  }));
}

export function getCustomerTransactions(
  transactions: Transaction[],
  customerId: number
): AggregatedTransaction[] {
  const customerTransactions = transactions.filter(
    ({ customerId: id }) => id === customerId
  );

  if (customerTransactions.length === 0) return [];

  const transactionsCodeMap = Object.groupBy(
    customerTransactions,
    ({ authorizationCode }) => authorizationCode
  );

  const aggregatedTransactions = Object.values(transactionsCodeMap).map(
    (groupedTransactions) => {
      const sortedTransactions = groupedTransactions!.sort(sortByStatus);
      const firstTransaction =
        sortedTransactions[sortedTransactions.length - 1];
      const timeline = getTimeline(sortedTransactions);
      return {
        ...sortedTransactions[0],
        transactionId: firstTransaction.transactionId,
        updatedAt: sortedTransactions[0].transactionDate,
        createdAt: firstTransaction.transactionDate,
        timeline: timeline
      };
    }
  );

  return aggregatedTransactions;
}

export default getCustomerTransactions;
