import {
  CustomerRelation,
  RelationType,
  Transaction,
  TransactionType
} from '../types';

function isP2PCompatibleTypes(
  type1: TransactionType,
  type2: TransactionType
): boolean {
  if (type1 === TransactionType.P2P_SEND)
    return type2 === TransactionType.P2P_RECEIVE;

  if (type1 === TransactionType.P2P_RECEIVE)
    return type2 === TransactionType.P2P_SEND;

  return false;
}

export function findDeviceRelations(
  transactions: Transaction[],
  customerId: number
): CustomerRelation[] {
  const relations: CustomerRelation[] = [];
  const knownDevices: string[] = [];

  for (const transaction of transactions) {
    if (customerId === transaction.customerId && transaction.metadata.deviceId)
      knownDevices.push(transaction.metadata.deviceId);
  }

  if (knownDevices.length === 0) return [];

  for (const transaction of transactions) {
    if (
      transaction.metadata.deviceId &&
      customerId !== transaction.customerId &&
      knownDevices.includes(transaction.metadata.deviceId)
    )
      relations.push({
        relatedCustomerId: transaction.customerId,
        relationType: RelationType.DEVICE
      });
  }

  return relations;
}

export function findP2PRelations(
  transactions: Transaction[],
  customerId: number
): CustomerRelation[] {
  const relations: CustomerRelation[] = [];
  const relatedTransactionTypes = new Map();
  const P2P_TYPES = [TransactionType.P2P_SEND, TransactionType.P2P_RECEIVE];

  for (const { customerId: id, transactionType, metadata } of transactions) {
    if (
      customerId === id &&
      P2P_TYPES.includes(transactionType) &&
      metadata?.relatedTransactionId
    )
      relatedTransactionTypes.set(
        metadata?.relatedTransactionId,
        transactionType === TransactionType.P2P_SEND
          ? RelationType.P2P_SEND
          : RelationType.P2P_RECEIVE
      );
  }

  if (relatedTransactionTypes.size === 0) return [];

  for (const transaction of transactions) {
    const relatedTransactionType = relatedTransactionTypes.get(
      transaction.transactionId
    );

    if (
      relatedTransactionType &&
      isP2PCompatibleTypes(transaction.transactionType, relatedTransactionType)
    )
      relations.push({
        relatedCustomerId: transaction.customerId,
        relationType: relatedTransactionType
      });
  }

  return relations;
}

export function getCustomerRelations(
  transactions: Transaction[],
  customerId: number
): CustomerRelation[] {
  const deviceRelations = findDeviceRelations(transactions, customerId);
  const userRelations = findP2PRelations(transactions, customerId);

  return [...deviceRelations, ...userRelations];
}

export default getCustomerRelations;
