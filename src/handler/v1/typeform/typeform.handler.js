const { env } = require("@config/vars");
const typeformService = require("@services/typeform");
const { OK } = require("@utils/helper");
const logger = require("@utils/logger");

/**
 * typeform
 * @public
 */

exports.typeform = async (event) => {
  logger.debug(`Trigger TypeForm handler: ${event}`);
  await typeformService();
  return OK();
};
