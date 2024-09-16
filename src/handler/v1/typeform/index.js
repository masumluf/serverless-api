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
const handler = require("./typeform.handler");
const validator = require("./typeform.validator");

const handlerWrapper = middy(handler.typeform)
  .use(errorMiddleware.converter())
  .use(cors())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser({ extended: false }))
  .use(httpSecurityHeaders())
  .use(monitoringMiddleware())
  .use(routeValidator({ schema: validator.joiSchema }));

module.exports = handlerWrapper;
