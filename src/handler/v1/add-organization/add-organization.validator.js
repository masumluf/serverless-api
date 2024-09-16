const Joi = require("joi");

module.exports = {
  name: "addOrganization",
  description: "This handler is responsible for add new organation",
  path: "/v1/organizations",
  type: "post",
  joiSchema: {
    body: Joi.object({
      organizationId: Joi.string()
        .required()
        .min(4)
        .max(100)
        .regex(/^[a-zA-Z0-9-]+$/)
        .messages({
          "string.pattern.base":
            "organizationId must not contain special characters, use only letters, numbers, and hyphens",
        }),
      displayName: Joi.string()
        .required()
        .min(4)
        .max(50),
      _7tapsId: Joi.string()
        .required()
        .min(4)
        .max(50),
      typeformId: Joi.string()
        .required()
        .min(4)
        .max(50),
      teamAppId: Joi.string()
        .required()
        .min(4)
        .max(50),
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
