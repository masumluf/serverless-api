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
const { Roles } = require("@config/vars");
const handler = require("./add-organization.handler");
const validator = require("./add-organization.validator");

const handlerWrapper = middy(handler.addOrganization)
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
  .use(authorizeMiddleware.authorizeRole([Roles.admin]));

module.exports = handlerWrapper;
