import { Key } from '@aws-cdk/aws-kms';
import { Stack } from '@aws-cdk/core';
import * as Chance from 'chance';
import { SecureBucket } from '../../src/s3';

jest.mock('@aws-cdk/aws-kms', () => ({
  Key: {
    fromLookup: jest.fn(),
  },
}));

const chance = new Chance();

describe('SecureBucket', () => {
  it('to use server side encryption', () => {
    (Key.fromLookup as jest.Mock).mockReturnValueOnce({
      keyId: chance.guid(),
    });

    const stack = new Stack();
    const bucket = new SecureBucket(stack, 'secure-bucket');

    expect(bucket.encryptionKey).toBeDefined();
  });
});