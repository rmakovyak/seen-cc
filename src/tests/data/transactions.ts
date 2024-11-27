import { Transaction } from '../../types';
import { TransactionType, TransactionStatus } from '../../types';

export const transactionStatusesSample: Transaction[] = [
  {
    transactionId: 4,
    authorizationCode: 'F10001',
    transactionDate: '2022-09-06T15:41:42+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Amazon',
    amount: -143.21,
    metadata: {
      relatedTransactionId: 3
    }
  },
  {
    transactionId: 8,
    authorizationCode: 'F10001',
    transactionDate: '2022-09-10T15:41:42+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.RETURNED,
    description: 'Amazon',
    amount: 143.21,
    metadata: {
      relatedTransactionId: 4
    }
  },
  {
    transactionId: 3,
    authorizationCode: 'F10001',
    transactionDate: '2022-09-05T11:36:42+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.PENDING,
    description: 'Amazon',
    amount: -143.21,
    metadata: {}
  }
];

export const transactionsSample: Transaction[] = [
  {
    transactionId: 1,
    authorizationCode: 'F10000',
    transactionDate: '2022-09-01T11:46:42+00:00',
    customerId: 1,
    transactionType: TransactionType.ACH_INCOMING,
    transactionStatus: TransactionStatus.PENDING,
    description: 'Deposit from Citibank',
    amount: 5000,
    metadata: {}
  },
  {
    transactionId: 2,
    authorizationCode: 'F10000',
    transactionDate: '2022-09-03T15:41:42+00:00',
    customerId: 1,
    transactionType: TransactionType.ACH_INCOMING,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Deposit from Citibank',
    amount: 5000,
    metadata: {
      relatedTransactionId: 1
    }
  },
  {
    transactionId: 3,
    authorizationCode: 'F10001',
    transactionDate: '2022-09-05T11:36:42+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.PENDING,
    description: 'Amazon',
    amount: -143.21,
    metadata: {}
  },
  {
    transactionId: 4,
    authorizationCode: 'F10001',
    transactionDate: '2022-09-06T15:41:42+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Amazon',
    amount: -143.21,
    metadata: {
      relatedTransactionId: 3
    }
  },
  {
    transactionId: 5,
    authorizationCode: 'F10002',
    transactionDate: '2022-09-07T08:32:00+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.PENDING,
    description: 'Walmart',
    amount: -89.5,
    metadata: {}
  },
  {
    transactionId: 6,
    authorizationCode: 'F10002',
    transactionDate: '2022-09-08T10:00:30+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Walmart',
    amount: -90.99,
    metadata: {
      relatedTransactionId: 5
    }
  },
  {
    transactionId: 7,
    authorizationCode: 'F10003',
    transactionDate: '2022-09-08T10:00:30+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Steam',
    amount: -50.21,
    metadata: {}
  },
  {
    transactionId: 8,
    authorizationCode: 'F10001',
    transactionDate: '2022-09-10T15:41:42+00:00',
    customerId: 1,
    transactionType: TransactionType.POS,
    transactionStatus: TransactionStatus.RETURNED,
    description: 'Amazon',
    amount: 143.21,
    metadata: {
      relatedTransactionId: 4
    }
  },
  {
    transactionId: 9,
    authorizationCode: 'F10004',
    transactionDate: '2022-09-02T00:35:00+00:00',
    customerId: 2,
    transactionType: TransactionType.ACH_INCOMING,
    transactionStatus: TransactionStatus.PENDING,
    description: 'Deposit from Chime',
    amount: 3000,
    metadata: {}
  },
  {
    transactionId: 10,
    authorizationCode: 'F10004',
    transactionDate: '2022-09-04T06:00:00+00:00',
    customerId: 2,
    transactionType: TransactionType.ACH_INCOMING,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Deposit from Chime',
    amount: 3000,
    metadata: {
      relatedTransactionId: 9
    }
  },
  {
    transactionId: 11,
    authorizationCode: 'F10005',
    transactionDate: '2022-09-04T06:30:00+00:00',
    customerId: 2,
    transactionType: TransactionType.WIRE_OUTGOING,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Transfer to Citibank',
    amount: -2995,
    metadata: {
      deviceId: 'F111000'
    }
  },
  {
    transactionId: 12,
    authorizationCode: 'F20005',
    transactionDate: '2022-09-04T06:30:00+00:00',
    customerId: 2,
    transactionType: TransactionType.FEE,
    transactionStatus: TransactionStatus.SETTLED,
    description: 'Fee for Outgoing Wire',
    amount: -5,
    metadata: {
      relatedTransactionId: 11
    }
  }
];
