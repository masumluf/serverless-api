const Joi = require("joi");

module.exports = {
  name: "typeform",
  description: "get typeform data using typeform API",
  path: "/v1/typeform",
  type: "get",
  joiSchema: {
    body: {},
    response: {
      200: {
        description: "OK",
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {},
        },
      },
      400: {
        description: "Error Response",
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(
              Joi.object().keys({
                errorCode: Joi.string().required(),
                errorTitle: Joi.string().required(),
                errorDescription: Joi.string().required(),
                errorDebugDescription: Joi.string(),
              }),
            ),
          },
        },
      },
    },
  },
};
