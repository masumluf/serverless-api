const { createOrganization } = require("@services/organization");
const { OK } = require("@utils/helper");
const logger = require("@utils/logger");

/**
 * addOrganization
 * @public
 */
exports.addOrganization = async (event) => {
  logger.debug("Called add organization handler");
  const { organizationId, displayName, _7tapsId, typeformId, teamAppId } = event.body;
  const organization = await createOrganization({
    organizationId,
    displayName,
    _7tapsId,
    typeformId,
    teamAppId,
  });
  return OK(organization);
};
