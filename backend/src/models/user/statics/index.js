const getByLocalCredential = require("./get-by-local-credential");

module.exports = function (userSchema) {
  userSchema.statics.getByLocalCredential = getByLocalCredential;
};
