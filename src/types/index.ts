export enum TransactionType {
  ACH_INCOMING = 'ACH_INCOMING',
  POS = 'POS',
  WIRE_OUTGOING = 'WIRE_OUTGOING',
  FEE = 'FEE',
  WIRE_INCOMING = 'WIRE_INCOMING',
  P2P_SEND = 'P2P_SEND',
  P2P_RECEIVE = 'P2P_RECEIVE'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SETTLED = 'SETTLED',
  RETURNED = 'RETURNED'
}

export enum RelationType {
  DEVICE = 'DEVICE',
  P2P_SEND = 'P2P_SEND',
  P2P_RECEIVE = 'P2P_RECEIVE'
}

export type Metadata = {
  relatedTransactionId?: number;
  deviceId?: string;
};

export type Transaction = {
  transactionId: number;
  authorizationCode: string;
  transactionDate: string;
  customerId: number;
  transactionType: TransactionType;
  transactionStatus: TransactionStatus;
  description: string;
  amount: number;
  metadata: Metadata;
};

export type Timeline = Array<{
  createdAt: string;
  status: TransactionStatus;
  amount: number;
}>;

export type AggregatedTransaction = Transaction & {
  createdAt: string;
  updatedAt: string;
  timeline: Timeline;
};

export type CustomerRelation = {
  relatedCustomerId: number;
  relationType: RelationType;
};

export type GroupedByDay = {
  date: string;
  total: number;
  transactions: AggregatedTransaction[];
};
