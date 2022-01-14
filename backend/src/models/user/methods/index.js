const register = require("./register");
const getCredentialByMethod = require("./get-credential-by-method");
const getLocalCredentialHash = require("./get-local-credential-hash");
const getLocalCredentialSalt = require("./get-local-credential-salt");

module.exports = function (userSchema) {
  userSchema.methods.register = register;
  userSchema.methods.getCredentialByMethod = getCredentialByMethod;
  userSchema.methods.getLocalCredentialHash = getLocalCredentialHash;
  userSchema.methods.getLocalCredentialSalt = getLocalCredentialSalt;
};
