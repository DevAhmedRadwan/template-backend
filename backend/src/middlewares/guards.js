const { UNAUTHORIZED } = require("../constants/response-status");
const errorUtil = require("../util/error");

module.exports.basicGuard = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    next();
  } else {
    next(
      errorUtil.build(
        UNAUTHORIZED,
        "You are not authorized to view this resource"
      )
    );
  }
};
