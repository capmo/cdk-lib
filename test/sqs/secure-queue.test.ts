import { Queue, QueueEncryption } from '@aws-cdk/aws-sqs';
import { Stack } from '@aws-cdk/core';
import { SecureQueue } from '../../src/sqs';

jest.mock('@aws-cdk/aws-sqs', () => ({
  ...jest.requireActual('@aws-cdk/aws-sqs'),
  Queue: jest.fn(),
}));

describe('SecureQueue', () => {
  const queueMock = (Queue as unknown as jest.Mock);

  beforeEach(() => {
    queueMock.mockClear();
  });


  it('to use server side encryption', () => {
    const stack = new Stack();
    new SecureQueue(stack, 'secure-queue');

    expect(queueMock.mock.calls[0][2]).toMatchObject({
      encryption: QueueEncryption.KMS_MANAGED,
    });
  });
});