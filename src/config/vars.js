const path = require("path");

// import .env variables
require("dotenv-safe").load({
  path: path.join(process.cwd(), ".env"),
  sample: path.join(process.cwd(), ".env.example"),
});

module.exports = {
  env: process.env.NODE_ENV,
  serviceName: "serverless-api",
  mongodbURL: process.env.MONGODB_URL,
  dynamoDbUserTable: process.env.DYNAMODB_USERS_TABLE_NAME,
  dynamodbOrganizationTable: process.env.DYNAMODB_ORGANIZATIONS_TABLE_NAME,
  dynamodbFeedbackTable: process.env.DYNAMODB_FEEDBACK_RESPONSE_TABLE_NAME,
  dynamodbTypeformWorkspaces: process.env.DYNAMODB_TYPEFORM_WORKSPACE_TABLE_NAME,
  dynamodbTypeformResponseTable: process.env.DYNAMODB_TYPEFORM_FORM_RESPONSE_TABLE_NAME,
  dynamodbTypeformFormsTable: process.env.DYNAMODB_TYPEFORM_FORM_TABLE_NAME,
  dynamodbTypeformFormWithDataTable: process.env.DYNAMODB_TYPEFORM_FORM_DATA_TABLE_NAME,
  dynamodbTypeformFormByWorkspaceTable: process.env.DYNAMODB_TYPEFORM_FORM_BY_WORKSPACE_TABLE_NAME,
  dynamodbTeamsAppWorkspaceTable: process.env.DYNAMODB_TEAMSAPP_WORKSPACE_TABLE_NAME,
  dynamodbTeamsAppCalenderEventsTable: process.env.DYNAMODB_TEAMSAPP_CALENDER_EVENTS_TABLE_NAME,
  awsAccessKeyId: process.env.ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.SECRET_ACCESS_KEY,
  awsRegion: process.env.REGION,
  typeFormBearerToken: process.env.TYPEFORM_BEARER_TOKEN,
  teamsAppURI: "https://teams-api.remoteteambuilder.io",
  http: {
    // Axios configuration to make http call
    timeout: 20000, // Timeout in ms
    responseType: "json",
    responseEncoding: "utf8",
  },
  Roles: {
    admin: "admin",
  },
  AwsAccountId: process.env.QUICKSIGHT_ACCOUNT_ID,
  DashboardId: process.env.QUICKSIGHT_DASHBOARD_ID,
};
