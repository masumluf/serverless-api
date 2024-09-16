const { updateOrganizationById } = require("@services/organization");
const { OK } = require("@utils/helper");
const logger = require("@utils/logger");

/**
 * updateOrganization
 * @public
 */
exports.updateOrganization = async (event) => {
  logger.debug("update organization handler called");
  const {
    pathParameters: { organizationId },
    body: { displayName, _7tapsId, typeformId, teamAppId },
  } = event;
  const organization = await updateOrganizationById(organizationId, {
    displayName,
    _7tapsId,
    typeformId,
    teamAppId,
  });
  return OK(organization);
};
