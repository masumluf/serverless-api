const { CognitoUserPool } = require("amazon-cognito-identity-js");

const params = {
  // UserPoolId: process.env.COGNITO_USER_POOL_ID,
  // ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
  UserPoolId: "eu-west-1_iXdovqwQp",
  ClientId: "3c028q2hqa0hdrflebojsuvvdv",
};

const userPool = new CognitoUserPool(params);

module.exports = {
  userPool,
};
