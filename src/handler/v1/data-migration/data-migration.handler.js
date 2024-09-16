const { dataMigrationService } = require("@services/data-migration");
const { OK } = require("@utils/helper");
const logger = require("@utils/logger");

/**
 * dataMigration
 * @public
 */
exports.dataMigration = async (event) => {
  logger.debug(event);
  await dataMigrationService();
  return OK(true);
};
