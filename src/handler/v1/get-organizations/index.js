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
const handler = require("./get-organizations.handler");
const validator = require("./get-organizations.validator");

const handlerWrapper = middy(handler.getOrganizations)
  .use(errorMiddleware.converter())
  .use(cors())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser({ extended: false }))
  .use(httpSecurityHeaders())
  .use(monitoringMiddleware())
  .use(routeValidator({ schema: validator.joiSchema }))
  .use(authorizeMiddleware.attachUserOnRequestEvent());

module.exports = handlerWrapper;
