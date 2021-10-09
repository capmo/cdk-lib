import { ArnPrincipal, Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps } from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

export class SecureBucket extends Bucket {
  constructor(scope: Construct, id: string, props?: BucketProps) {
    super(scope, id, {
      ...props,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketKeyEnabled: true,
      encryption: BucketEncryption.KMS,
    });

    this.addToResourcePolicy(
      new PolicyStatement({
        actions: ['s3:*'],
        conditions: {
          Bool: {
            'aws:SecureTransport': 'false',
          },
        },
        effect: Effect.DENY,
        principals: [new ArnPrincipal('*')],
        resources: [this.arnForObjects('*'), this.bucketArn],
      }),
    );
  }
}
