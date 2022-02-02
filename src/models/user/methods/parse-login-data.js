module.exports = function parseLoginData(method) {
  let localCredential = this.getCredentialMethod(method);
  let parsedLoginData = {};
  localCredential.loginData.forEach((element) => {
    parsedLoginData[element.key] = element.value;
  });
  return parsedLoginData;
};
