import { AggregatedTransaction, GroupedByDay } from '../types';

export function sortByDate(a: GroupedByDay, b: GroupedByDay): number {
  return a.date > b.date ? -1 : 1;
}

export function getTransactionsByDay(
  transactions: AggregatedTransaction[]
): GroupedByDay[] {
  const transactionsDayMap = Object.groupBy(
    transactions,
    ({ transactionDate }) => transactionDate.split('T')[0]
  );

  const aggregatedTransactions = Object.entries(transactionsDayMap).map(
    (entry) => {
      const [date, transactions] = entry;
      const total = transactions!.reduce((prev, curr) => prev + curr.amount, 0);

      return {
        date,
        total,
        transactions: transactions
      };
    }
  );

  const sorted = (aggregatedTransactions as GroupedByDay[]).sort(sortByDate);

  return sorted as GroupedByDay[];
}

export default getTransactionsByDay;
