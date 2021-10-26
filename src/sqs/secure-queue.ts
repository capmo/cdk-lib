import { Queue, QueueProps, QueueEncryption } from '@aws-cdk/aws-sqs';
import { Construct } from '@aws-cdk/core';


export class SecureQueue extends Queue {
  constructor(scope: Construct, id: string, props?: QueueProps) {
    super(scope, id, {
      ...props,
      encryption: QueueEncryption.KMS_MANAGED,
    });
  }
}
