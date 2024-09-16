const Joi = require("joi");

module.exports = {
  name: "getOrganization",
  description: "This handler is responsible for get the organization by organization ID",
  path: "/v1/organizations/{organizationId}",
  type: "get",
  joiSchema: {
    body: {},
    params: Joi.object({
      organizationId: Joi.string()
        .required()
        .min(4)
        .max(100)
        .regex(/^[a-zA-Z0-9-]+$/)
        .messages({
          "string.pattern.base":
            "organizationId must not contain special characters, use only letters, numbers, and hyphens",
        }),
    }).options({ abortEarly: false }),
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
