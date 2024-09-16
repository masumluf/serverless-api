const middy = require("middy");
const {
  httpEventNormalizer,
  httpHeaderNormalizer,
  jsonBodyParser,
  urlEncodeBodyParser,
  cors,
  httpSecurityHeaders,
} = require("middy/middlewares");
const { errorMiddleware } = require("@middlewares/error");
const { routeValidator } = require("@middlewares/route-validator");
const { monitoringMiddleware } = require("@middlewares/monitoring");
const { authorizeMiddleware } = require("@middlewares/authorize");
const handler = require("./update-organization.handler");
const validator = require("./update-organization.validator");

const handlerWrapper = middy(handler.updateOrganization)
  .use(errorMiddleware.converter())
  .use(cors())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser({ extended: false }))
  .use(httpSecurityHeaders())
  .use(monitoringMiddleware())
  .use(routeValidator({ schema: validator.joiSchema }))
  .use(authorizeMiddleware.attachUserOnRequestEvent())
  .use(authorizeMiddleware.authorizeOrganization("organizationId"));

module.exports = handlerWrapper;
