require("module-alias/register");

// define all the routes/handlers
const addOrganizationRoute = require("./handler/v1/add-organization");
const updateOrganizationRoute = require("./handler/v1/update-organization");
const getOrganizationsRoute = require("./handler/v1/get-organizations");
const getOrganizationRoute = require("./handler/v1/get-organization");
const typeFormRoute = require("./handler/v1/typeform");
const dataMigrationRoute = require("./handler/v1/data-migration");

// export all the routes/handlers

module.exports = {
  addOrganization: addOrganizationRoute,
  updateOrganization: updateOrganizationRoute,
  getOrganizations: getOrganizationsRoute,
  getOrganization: getOrganizationRoute,
  typeForm: typeFormRoute,
  migration: dataMigrationRoute,
};
