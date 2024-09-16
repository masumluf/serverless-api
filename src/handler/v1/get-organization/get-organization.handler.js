const { getOrganizationById } = require("@services/organization");
const { OK } = require("@utils/helper");
const logger = require("@utils/logger");

/**
 * getOrganization
 * @public
 */
exports.getOrganization = async (event) => {
  logger.debug("get organizations list handler called");
  const {
    pathParameters: { organizationId },
  } = event;
  const organizations = await getOrganizationById(organizationId);
  return OK(organizations);
};
