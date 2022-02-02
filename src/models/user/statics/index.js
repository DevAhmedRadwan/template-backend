const register = require("./register");
const updateById = require("./update-by-id");
const getByLocalCredential = require("./get-by-local-credential");
const deleteUserAndAllPossessions = require("./delete-user-and-all-possessions");

module.exports = function (userSchema) {
  userSchema.statics.register = register;
  userSchema.statics.updateById = updateById;
  userSchema.statics.getByLocalCredential = getByLocalCredential;
  userSchema.statics.deleteUserAndAllPossessions = deleteUserAndAllPossessions;
};
