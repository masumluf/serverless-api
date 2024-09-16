const { dynamoDb } = require("@config/dynamodb");
const {
  dynamodbTypeformWorkspaces,
  dynamodbTypeformResponseTable,
  dynamodbTypeformFormsTable,
  dynamodbTypeformFormWithDataTable,
  dynamodbTypeformFormByWorkspaceTable,
  dynamodbTeamsAppWorkspaceTable,
  dynamodbTeamsAppCalenderEventsTable,
} = require("@config/vars");
/**
 * Dbhelper Utility
 *
 */

const storeTypeFormWorkspace = async (dbIndexName, body) => {
  const tableName = dynamodbTypeformWorkspaces;
  const dbItem = {
    TableName: tableName,
    Item: {
      body,
      organizationId: dbIndexName,
      ts: `${Date.now()}`,
      account_id: body.account_id,
      default: body.default,
      forms: body.forms,
      name: body.name,
      self: body.self,
      shared: body.shared,
    },
  };
  await dynamoDb.put(dbItem).promise();
};

const storeTypeFormAllForms = async (dbIndexName, dateTime, body) => {
  const tableName = dynamodbTypeformFormsTable;
  const dbItem = {
    TableName: tableName,
    Item: {
      body,
      formId: dbIndexName,
      ts: dateTime,
    },
  };
  await dynamoDb.put(dbItem).promise();
};

const storeTypeFormFormByWorkspace = async (dbIndexName, formId, body) => {
  const tableName = dynamodbTypeformFormByWorkspaceTable;
  const dbItem = {
    TableName: tableName,
    Item: {
      body,
      organizationId: dbIndexName,
      formId,
    },
  };
  await dynamoDb.put(dbItem).promise();
};

const storeTypeFormFormData = async (dbIndexName, organizationId, body) => {
  const tableName = dynamodbTypeformFormWithDataTable;
  const dbItem = {
    TableName: tableName,
    Item: {
      body,
      formId: dbIndexName,
      organizationId,
      created_at: body.created_at,
      fields: body.fields,
      last_updated_at: body.last_updated_at,
      published_at: body.published_at,
      settings: body.settings,
      thankyou_screens: body.thankyou_screens,
      theme: body.theme,
      title: body.title,
      type: body.type,
      workspace: body.workspace,
      workspaceid: body.workspaceid,
      _linkss: body._linkss,
    },
  };
  await dynamoDb.put(dbItem).promise();
};

const storeTypeFormFromResponse = async (dbIndexName, landingId, body) => {
  const tableName = dynamodbTypeformResponseTable;
  const dbItem = {
    TableName: tableName,
    Item: {
      body,
      formId: dbIndexName,
      landingId,
      answers: body.answers || [],
      calculated: body.calculated || [],
      submitted_at: body.submitted_at,
      response_id: body.response_id,
      token: body.token,
      workspaceId: body.workspaceId,
      metadata: body.metadata || [],
      response_type: body.response_type,
      landed_at: body.landed_at,
    },
  };
  await dynamoDb.put(dbItem).promise();
};

const fetchTypeFormWorkspaceData = async () => {
  const tableName = dynamodbTypeformWorkspaces;
  const params = {
    TableName: tableName,
  };
  const data = await dynamoDb.scan(params).promise();
  const workspaces = data.Items.map((workspace) => {
    return {
      organizationId: workspace.organizationId,
      organizationName: workspace.body.name,
    };
  });
  return workspaces;
};

const storeTeamsAppWorkspaceData = async (dbIndexName, body) => {
  const tableName = dynamodbTeamsAppWorkspaceTable;
  const dbItem = {
    TableName: tableName,
    Item: {
      body,
      organizationId: dbIndexName,
    },
  };
  await dynamoDb.put(dbItem).promise();
};

const storeTeamsAppCalenderEvents = async (dbIndexName, eventId, body) => {
  const tableName = dynamodbTeamsAppCalenderEventsTable;
  const dbItem = {
    TableName: tableName,
    Item: {
      body,
      organizationId: dbIndexName,
      eventId,
    },
  };
  await dynamoDb.put(dbItem).promise();
};

module.exports = {
  storeTypeFormWorkspace,
  storeTypeFormAllForms,
  storeTypeFormFormByWorkspace,
  storeTypeFormFormData,
  storeTypeFormFromResponse,
  fetchTypeFormWorkspaceData,
  storeTeamsAppWorkspaceData,
  storeTeamsAppCalenderEvents,
};
