import { Table, TableProps } from '@aws-cdk/aws-dynamodb';
import { Construct, RemovalPolicy } from '@aws-cdk/core';

export class SecureTable extends Table {
  constructor(scope: Construct, id: string, props: TableProps) {
    super(scope, id, {
      ...props,
      pointInTimeRecovery: true,
      removalPolicy: RemovalPolicy.RETAIN,
      serverSideEncryption: true,
    });
  }
}
