const { getOrganizationList } = require("@services/organization");
const { formatAllowedOrganizationIds } = require("@utils/auth");
const { OK } = require("@utils/helper");
const logger = require("@utils/logger");

/**
 * getOrganizations
 * @public
 */

exports.getOrganizations = async (event) => {
  logger.debug("Get organizaton list handler called");
  const organizations = await getOrganizationList();

  const { _user = {} } = event;

  const allowedOrganizations = formatAllowedOrganizationIds(_user.organizations);

  const filteredAllowedOrganizations = organizations.filter((organization) => {
    return allowedOrganizations.includes(organization.organizationId);
  });
  return OK(filteredAllowedOrganizations);
};
