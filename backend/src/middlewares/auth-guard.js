const { UNAUTHORIZED } = require("../constant/response-status");
const errorUtil = require("../util/error");

module.exports.guard = () => {
  return (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();

    if (isAuthenticated) {
      next();
    } else {
      next(
        errorUtil.build(UNAUTHORIZED, "Not authorized to view this resource")
      );
    }
  };
};
