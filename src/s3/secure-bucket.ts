import { Key } from '@aws-cdk/aws-kms';
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps } from '@aws-cdk/aws-s3';
import { Construct, Tags } from '@aws-cdk/core';

export const S3InventoryEnforceSSETagKey = '__S3Inventory_EnforceSSE';

export class SecureBucket extends Bucket {
  constructor(scope: Construct, id: string, props?: BucketProps) {
    // Retrieves the default S3 KMS key
    const s3KmsKey = Key.fromLookup(scope, `${id}-kmsKey`, {
      aliasName: 'alias/aws/s3',
    });

    super(scope, id, {
      ...props,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketKeyEnabled: true,
      encryption: BucketEncryption.KMS,
      encryptionKey: s3KmsKey,
      enforceSSL: true,
    });

    /*
     * Adds the S3 bucket tag which is used as a selector by the s3-bucket-encryptor
     * to encrypt existing non-encrypted S3 objects
     */
    Tags.of(this).add(S3InventoryEnforceSSETagKey, 'true');
  }
}
