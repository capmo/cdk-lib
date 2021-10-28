import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { RemovalPolicy, Stack } from '@aws-cdk/core';
import { SecureTable } from '../../src/dynamodb';

jest.mock('@aws-cdk/aws-dynamodb', () => ({
  ...jest.requireActual('@aws-cdk/aws-dynamodb'),
  Table: jest.fn(),
}));

describe('SecureTable', () => {
  const tableMock = (Table as unknown as jest.Mock);
  beforeEach(() => {
    tableMock.mockClear();
  });

  it('to use server side encryption, recovery and retained removal policy', () => {
    const stack = new Stack();
    new SecureTable(stack, 'secure-table', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });

    expect(tableMock).toHaveBeenCalled();
    expect(tableMock.mock.calls[0][2]).toMatchObject({
      partitionKey: { name: 'id', type: AttributeType.STRING },
      serverSideEncryption: true,
    });
  });

  it('to use point-in-time recovery', () => {
    const stack = new Stack();
    new SecureTable(stack, 'secure-table', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });

    expect(tableMock).toHaveBeenCalled();
    expect(tableMock.mock.calls[0][2]).toMatchObject({
      partitionKey: { name: 'id', type: AttributeType.STRING },
      pointInTimeRecovery: true,
    });
  });

  it('to use retained removal policy', () => {
    const stack = new Stack();
    new SecureTable(stack, 'secure-table', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });

    expect(tableMock).toHaveBeenCalled();
    expect(tableMock.mock.calls[0][2]).toMatchObject({
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.RETAIN,
    });
  });
});