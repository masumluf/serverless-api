/**
 * Organization Service
 *
 */
const { dynamoDb } = require("@config/dynamodb");
const { dynamodbOrganizationTable } = require("@config/vars");

const getOrganizationList = async () => {
  const params = {
    TableName: dynamodbOrganizationTable,
  };
  const organizations = await dynamoDb.scan(params).promise();
  return organizations.Items;
};

const getOrganizationById = async (organizationId) => {
  if (!organizationId) return null;
  const params = {
    TableName: dynamodbOrganizationTable,
    Key: {
      organizationId,
    },
  };
  const organization = await dynamoDb.get(params).promise();
  return organization.Item;
};
const createOrganization = async ({
  organizationId,
  displayName,
  _7tapsId,
  typeformId,
  teamAppId,
}) => {
  const organization = await getOrganizationById(organizationId);

  if (organization) throw new Error(`${organizationId} allready exists`);

  const params = {
    TableName: dynamodbOrganizationTable,
    Item: {
      organizationId,
      displayName,
      _7tapsId,
      typeformId,
      teamAppId,
      createdAtTs: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();
  return params.Item;
};

const deleteOrganizationById = async (organizationId) => {
  if (!organizationId) return null;
  const params = {
    TableName: dynamodbOrganizationTable,
    Key: {
      organizationId,
    },
  };
  const organization = await dynamoDb.delete(params).promise();
  return organization;
};
const updateOrganizationById = async (organizationId, updateData = {}) => {
  const existingOrganization = await getOrganizationById(organizationId);
  if (!existingOrganization)
    throw new Error(`Organization does not exits with this id: ${organizationId}`);
  const updateExpressionParts = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};
  updateData.updatedAtTs = Date.now();
  // Loop through the updateData and construct the UpdateExpression and ExpressionAttributeValues
  Object.keys(updateData).forEach((key) => {
    const expressionKey = `#${key}`;
    updateExpressionParts.push(`${expressionKey} = :${key}`);
    expressionAttributeValues[`:${key}`] = updateData[key];

    // Handle reserved keywords in attribute names
    expressionAttributeNames[expressionKey] = key;
  });

  // Parameters for the DynamoDB update operation
  const params = {
    TableName: dynamodbOrganizationTable,
    Key: {
      organizationId,
    },
    UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames, // Include this for reserved keywords
    ReturnValues: "ALL_NEW", // Optional, returns the updated item
  };

  const organization = await dynamoDb.update(params).promise();
  return organization.Attributes;
};
module.exports = {
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  getOrganizationList,
  deleteOrganizationById,
};
