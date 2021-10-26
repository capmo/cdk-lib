const {
  AwsCdkConstructLibrary,
  NodePackageManager,
  ProjectType,
} = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Klemens Mang',
  authorAddress: 'klemens.mang@capmo.de',
  cdkVersion: '1.129.0',
  defaultReleaseBranch: 'main',
  name: '@capmo/cdk-lib',
  packageManager: NodePackageManager.NPM,
  npmRegistryUrl: 'https://npm.pkg.github.com',
  npmTokenSecret: 'GITHUB_TOKEN',
  repositoryUrl: 'git@github.com:capmo/cdk-lib.git',

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-kms',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-sqs',
  ] /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */,
  cdkTestDependencies: [
    '@aws-cdk/assert',
  ] /* AWS CDK modules required for testing. */,
  deps: [],
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-kms',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-sqs',
    '@types/chance',
    'chance',
  ],
  // packageName: undefined,            /* The "name" in package.json. */
  projectType:
    ProjectType.AwsCdkConstructLibrary /* Which type of project this is (library/app). */,
  // release: undefined,                /* Add release management to this project. */
});
project.synth();
