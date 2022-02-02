const localCredentialHandler = require("./local-credential-handler");

module.exports.createCredential = function (credential) {
  return {
    method: credential.method,
    loginData: createLoginData(credential),
  };
};

function createLoginData(credential) {
  switch (credential.method) {
    case "local":
      return localCredentialHandler.createLocalCredentialLoginDate(credential);
    default:
      throw new Error(`${credential.method} not a valid credential method`);
  }
}

module.exports.updateCredential = function (oldCredential, newCredential) {
  return {
    method: oldCredential.method,
    loginData: updateLoginData(oldCredential, newCredential),
  };
};

function updateLoginData(oldCredential, newCredential) {
  // it doesn't matter which one we use old or new
  // credential the two should have the same credential
  switch (newCredential.method) {
    case "local":
      return localCredentialHandler.updateLocalCredentialLoginDate(
        oldCredential,
        newCredential
      );
    default:
      throw new Error(`${oldCredential.method} not a valid credential method`);
  }
}
