const { UNAUTHORIZED } = require("../constant/response-status");
const errorUtil = require("../util/error");

module.exports.guard = (roles) => {
  return (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
    let rolesIntersection = [];

    if (isAuthenticated)
      rolesIntersection = req.user.role.filter((role) => roles.includes(role));

    if (isAuthenticated && rolesIntersection.length > 0) {
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
};
