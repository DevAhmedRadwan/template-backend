module.exports = function getLocalCredentialSalt() {
  let localCredential = this.getCredentialByMethod("local");
  let salt = null;
  localCredential.loginData.forEach((element) => {
    if (element.key == "salt") {
      salt = element.value;
      return;
    }
  });
  return salt;
};
