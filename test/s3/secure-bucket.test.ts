import { Key } from '@aws-cdk/aws-kms';
import { BucketEncryption, Bucket, BlockPublicAccess } from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';
import * as Chance from 'chance';
import { S3InventoryEnforceSSETagKey, SecureBucket } from '../../src/s3';

jest.mock('@aws-cdk/aws-kms', () => ({
  Key: {
    fromLookup: jest.fn(),
  },
}));

jest.mock('@aws-cdk/aws-s3', () => ({
  ...jest.requireActual('@aws-cdk/aws-s3'),
  Bucket: jest.fn(),
}));

const tagAddMock = jest.fn();
jest.mock('@aws-cdk/core', () => ({
  ...jest.requireActual('@aws-cdk/core'),
  Tags: {
    of: jest.fn(() => ({
      add: tagAddMock,
    })),
  },
}));

const chance = new Chance();

describe('SecureBucket', () => {
  const bucketMock = (Bucket as unknown as jest.Mock);

  beforeEach(() => {
    bucketMock.mockClear();
    tagAddMock.mockClear();
  });

  it('to use SSE', () => {
    const encryptionKey = {
      keyId: chance.guid(),
    };

    (Key.fromLookup as jest.Mock).mockReturnValueOnce(encryptionKey);

    const stack = new Stack();
    new SecureBucket(stack, 'secure-bucket');

    expect(bucketMock.mock.calls[0][2]).toMatchObject({
      bucketKeyEnabled: true,
      encryption: BucketEncryption.KMS,
      encryptionKey,
    });
  });

  it('to block public access', () => {
    const stack = new Stack();
    new SecureBucket(stack, 'secure-bucket');

    expect(bucketMock.mock.calls[0][2]).toMatchObject({
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });
  });

  it('to enforce SSL in transit', () => {
    const stack = new Stack();
    new SecureBucket(stack, 'secure-bucket');

    expect(bucketMock.mock.calls[0][2]).toMatchObject({
      enforceSSL: true,
    });
  });

  it('to set S3 inventory enforce SSE tag', () => {
    const stack = new Stack();
    new SecureBucket(stack, 'secure-bucket');

    expect(tagAddMock).toHaveBeenCalledWith(S3InventoryEnforceSSETagKey, 'true');
  });
});