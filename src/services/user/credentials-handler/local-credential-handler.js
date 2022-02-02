const { encryptPassword } = require("../../../util/password");
const keys = { email: "email", hash: "hash", salt: "salt" };

module.exports.createLocalCredentialLoginDate = function (credential) {
  const { salt, hash } = encryptPassword(credential.password);
  return [
    { key: keys.email, value: credential.email },
    { key: keys.hash, value: hash },
    { key: keys.salt, value: salt },
  ];
};

module.exports.updateLocalCredentialLoginDate = function (
  oldCredential,
  newCredential
) {
  let loginData = [];
  // compare and update the email
  if (newCredential.email) {
    loginData.push({ key: keys.email, value: newCredential.email });
  } else {
    loginData.push(
      oldCredential.loginData.find((element) => element.key == keys.email)
    );
  }
  // compare and update the password aka hash and salt
  if (newCredential.password) {
    const { salt, hash } = encryptPassword(newCredential.password);
    loginData.push({ key: keys.hash, value: hash });
    loginData.push({ key: keys.salt, value: salt });
  } else {
    loginData.push(
      oldCredential.loginData.find((element) => element.key == keys.hash)
    );
    loginData.push(
      oldCredential.loginData.find((element) => element.key == keys.salt)
    );
  }
  return loginData;
};
