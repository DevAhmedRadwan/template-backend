const { UNAUTHORIZED, CONFLICT } = require("../constants/response-status");
const errorUtil = require("../util/error");

module.exports.basicGuard = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    next();
  } else {
    next(
      errorUtil.build(
        UNAUTHORIZED,
        "you are not authorized to view this resource"
      )
    );
  }
};

module.exports.loginGuard = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    next(errorUtil.build(CONFLICT, "you are already authenticated"));
  } else {
    next();
  }
};
