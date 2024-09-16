const AWS = require("aws-sdk");

// Create an instance of the DynamoDB Document Client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamoDb,
};
