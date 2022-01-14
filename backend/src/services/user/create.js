const { encryptPassword } = require("../../util/password");

async function create({ firstName, lastName, credential }, userModel) {
  let user = {
    firstName: firstName,
    lastName: lastName,
    credentials: [createCredential(credential)],
  };
  try {
    return await userModel(user).register();
  } catch (error) {
    throw error;
  }
}

function createCredential(credential) {
  return {
    method: credential.method,
    loginData: handleLoginData(credential),
  };
}

function handleLoginData(credential) {
  switch (credential.method) {
    case "local":
      return createLocalCredentialLoginDate(credential);
    default:
      throw new Error(`${credential.method} not a valid credential method!`);
  }
}

function createLocalCredentialLoginDate(credential) {
  const saltAndHash = encryptPassword(credential.password);
  const salt = saltAndHash.salt;
  const hash = saltAndHash.hash;
  return [
    { key: "email", value: credential.email },
    { key: "hash", value: hash },
    { key: "salt", value: salt },
  ];
}

module.exports = create;
