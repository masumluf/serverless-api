const httpStatus = require("http-status");
const Class = require("es-class");
const appErrorCode = require("./ErrorCode");

/**
 * Wrap Error
 * @param {String} errCode        Code
 * @param {String} errTitle       Title
 * @param {String} errDesc        Description
 * @param {String} errDebugDesc   Debug Description
 * @param {Object} errAttributes  Attributes
 */
const generateError = (errCode, errTitle, errDesc, errDebugDesc, errAttributes) => {
  const result = {
    errorCode: errCode,
    errorTitle: errTitle,
    errorDescription: errDesc,
    errorDebugDescription: errDebugDesc,
    errorAttributes: errAttributes,
  };
  return result;
};

/**
 * @extends Error
 */
const ExtendableError = Class({
  extends: Error,
  constructor({
    // eslint-disable-line
    message,
    errors,
    route,
    status,
    isPublic,
    stack,
  }) {
    this.super(message);
    this.name = this.constructor.name;
    this.message = message || "Oops! Something is wrong";
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.route = route;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
  },
});

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    route = "default",
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      route,
      status,
      isPublic,
      stack,
    });
  }

  static notFound() {
    return new APIError({
      message: "Resource not found!",
      status: httpStatus.NOT_FOUND,
      errors: [
        generateError(
          "NOT_FOUND",
          "Oops! Something is wrong",
          "The resource you are looking for does not exist!",
          "Client with that name is not exist",
        ),
      ],
    });
  }

  static forbidden() {
    return new APIError({
      message: "Request forbidden!",
      status: httpStatus.FORBIDDEN,
      errors: [
        generateError(
          "FORBIDDEN",
          "Sorry! you don't have required permission",
          "You don't have minimum required permission to access this resource",
          "Please contact with customer care to claim your required permission",
        ),
      ],
    });
  }

  static unAuthorized() {
    return new APIError({
      message: "Unauthorized!",
      status: httpStatus.UNAUTHORIZED,
      errors: [
        generateError(
          "UNAUTHORIZED",
          "Sorry! you are unauthorized",
          "Please provide valid token",
          "You have to login into your account to get the required token",
        ),
      ],
    });
  }

  static withCode(code, status, errorAttibutes) {
    const errorCode = code && appErrorCode[code] ? code : "UNSPECIFIED";
    const _error = appErrorCode[errorCode];
    const errAttributes = errorAttibutes || {};
    if (errorCode === "UNSPECIFIED") {
      errAttributes.missingCode = code;
    }
    const errors = [
      generateError(errorCode, _error.errTitle, _error.errDesc, _error.errDebugDesc, errAttributes),
    ];
    return new APIError({
      message: _error.errTitle,
      status: status || 400,
      errors,
    });
  }
}

module.exports = {
  APIError,
  generateError,
};
