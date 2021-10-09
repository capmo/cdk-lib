import { Stack } from '@aws-cdk/core';
import { SecureBucket } from '../../src/s3';

describe('SecureBucket', () => {
  it('to have a security policy attached', () => {
    const stack = new Stack();
    const bucket = new SecureBucket(stack, 'secure-bucket');

    expect(bucket.policy?.document).toBeDefined();
  });

  it('to use server side encryption', () => {
    const stack = new Stack();
    const bucket = new SecureBucket(stack, 'secure-bucket');

    expect(bucket.encryptionKey).toBeDefined();
  });
});