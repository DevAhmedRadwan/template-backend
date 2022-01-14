module.exports = function getLocalCredentialHash() {
  let localCredential = this.getCredentialByMethod("local");
  let hash = null;
  localCredential.loginData.forEach((element) => {
    if (element.key == "hash") {
      hash = element.value;
      return;
    }
  });
  return hash;
};
