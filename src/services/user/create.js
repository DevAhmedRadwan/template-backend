const credentialsHandler = require("./credentials-handler");

async function create({ firstName, lastName, credential }, userModel) {
  let user = {
    firstName: firstName,
    lastName: lastName,
    credentials: [credentialsHandler.createCredential(credential)],
  };

  return await userModel.register(user);
}

module.exports = create;
