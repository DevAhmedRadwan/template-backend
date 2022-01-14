const errorUtil = require("../../util/error");

module.exports = (err, req, res, next) => {
  if (err.errors) {
    const error = {};
    const keys = Object.keys(err.errors);

    keys.forEach((key) => {
      if (err.errors[key].kind == "unique") {
        next(
          errorUtil.build(
            400,
            key[0].toUpperCase() + key.slice(1) + " already exist!",
            null
          )
        );
      }

      let message = err.errors[key].message;

      if (err.errors[key].properties && err.errors[key].properties.message) {
        message = err.errors[key].properties.message;
      }

      error[key] = message;
    });

    next(errorUtil.build(500, "Database validation and verfication error!", error));
  }

  next(err);
};
