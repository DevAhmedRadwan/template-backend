module.exports = function getCredentialMethod(method) {
  let localCredential = null;
  this.credentials.forEach((credential) => {
    if (credential.method == method) {
      localCredential = credential;
      return;
    }
  });
  return localCredential;
};
