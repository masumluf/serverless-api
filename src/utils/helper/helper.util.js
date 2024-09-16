const httpStatus = require("http-status");

const OK = (data = {}, statusCode = httpStatus.OK, headers = {}) => ({
  statusCode,
  headers,
  body: JSON.stringify({
    success: true,
    data,
  }),
});

module.exports = {
  OK,
};
