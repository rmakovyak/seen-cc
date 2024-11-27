import getCustomerRelations, {
  findDeviceRelations,
  findP2PRelations
} from '../helpers/getCustomerRelations';
import { RelationType } from '../types';
import { transactionsRelationsSample } from './data/transactions';

describe('findDeviceRelations', () => {
  it('should return device relations for a given customer', () => {
    const result = findDeviceRelations(transactionsRelationsSample, 4);
    expect(result).toEqual([
      {
        relatedCustomerId: 3,
        relationType: RelationType.DEVICE
      },
      {
        relatedCustomerId: 5,
        relationType: RelationType.DEVICE
      }
    ]);
  });

  it('should return empty array if no relations found', () => {
    const result = findDeviceRelations(transactionsRelationsSample, 11);
    expect(result).toEqual([]);
  });
});

describe('findP2PRelations', () => {
  it('should return p2p relations for a given customer', () => {
    const result = findP2PRelations(transactionsRelationsSample, 4);
    expect(result).toEqual([
      {
        relatedCustomerId: 3,
        relationType: RelationType.P2P_RECEIVE
      },
      {
        relatedCustomerId: 5,
        relationType: RelationType.P2P_RECEIVE
      }
    ]);
  });

  it('should return empty array if no relations found', () => {
    const result = findDeviceRelations(transactionsRelationsSample, 11);
    expect(result).toEqual([]);
  });
});

describe('getCustomerRelations', () => {
  it('should return relations for a given customer', () => {
    const result = getCustomerRelations(transactionsRelationsSample, 4);
    expect(result).toEqual([
      {
        relatedCustomerId: 3,
        relationType: RelationType.DEVICE
      },
      {
        relatedCustomerId: 5,
        relationType: RelationType.DEVICE
      },
      {
        relatedCustomerId: 3,
        relationType: RelationType.P2P_RECEIVE
      },
      {
        relatedCustomerId: 5,
        relationType: RelationType.P2P_RECEIVE
      }
    ]);
  });

  it('should return empty array if no relations found', () => {
    const result = getCustomerRelations(transactionsRelationsSample, 11);
    expect(result).toEqual([]);
  });
});
