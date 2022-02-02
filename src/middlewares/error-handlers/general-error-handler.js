const { node_env } = require("../../configs/env");

module.exports = (error, req, res, next) => {
  let status = error.statusCode || 500;
  let message = error.message;
  let data = error.data;
  // in testing and production only log 500 errors
  if (status == 500) {
    console.log(error);
  }
  // in testing and production only cnage the message and date of 500 errors
  if (status == 500 && (node_env == "production" || node_env == "test")) {
    message = "Internal server error!";
    data = "No data available";
  }
  res.status(status).json({ message: message, data: data });
};
