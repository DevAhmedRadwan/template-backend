const crypto = require("crypto");
const {
  PASSWORD_ENCRYPTION_ITERATIONS,
  PASSWORD_ENCRYPTION_OUTPUT_LENGTH,
  PASSWORD_ENCRYPTION_SALT_BYTE_LENGTH,
} = require("../configs/env");

function encryptPassword(password) {
  var salt = crypto
    .randomBytes(PASSWORD_ENCRYPTION_SALT_BYTE_LENGTH)
    .toString("hex");
  var genHash = crypto
    .pbkdf2Sync(
      password,
      salt,
      PASSWORD_ENCRYPTION_ITERATIONS,
      PASSWORD_ENCRYPTION_OUTPUT_LENGTH,
      "sha512"
    )
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(
      password,
      salt,
      PASSWORD_ENCRYPTION_ITERATIONS,
      PASSWORD_ENCRYPTION_OUTPUT_LENGTH,
      "sha512"
    )
    .toString("hex");
  return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.encryptPassword = encryptPassword;
