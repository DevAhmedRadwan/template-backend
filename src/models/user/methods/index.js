const parseLoginData = require("./parse-login-data");
const getProfileData = require("./get-profile-data");
const hasCredentialMethod = require("./has-credential-method");
const getCredentialMethod = require("./get-credential-method");

module.exports = function (userSchema) {
  userSchema.methods.parseLoginData = parseLoginData;
  userSchema.methods.getProfileData = getProfileData;
  userSchema.methods.hasCredentialMethod = hasCredentialMethod;
  userSchema.methods.getCredentialMethod = getCredentialMethod;
};
