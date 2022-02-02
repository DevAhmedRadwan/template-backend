module.exports = function hasCredentialMethod(method) {
  for (let credential of this.credentials) {
    if (credential.method == method) {
      return true;
    }
  }
  return false;
};
