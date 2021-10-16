import { Stack } from '@aws-cdk/core';
import { SecureBucket } from '../../src/s3';

describe('SecureBucket', () => {
  it('to use server side encryption', () => {
    const stack = new Stack();
    const bucket = new SecureBucket(stack, 'secure-bucket');

    expect(bucket.encryptionKey).toBeDefined();
  });
});