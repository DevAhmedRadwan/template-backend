const { findSourceMap } = require("module");
const credentialsHandler = require("./credentials-handler");

async function update(user, { firstName, lastName, credentials }, userModel) {
  let newUserData = {
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    credentials: insertAndUpdateCredentials(user.credentials, credentials),
  };
  return await userModel.updateById(user._id, newUserData);
}

function insertAndUpdateCredentials(userCredentials, credentials) {
  // adding all the user credentials to the new credentials
  // so we will update it in place if we find any update
  // or push in it if we found any insertion
  let newCredentials = [...userCredentials];
  // loop on all the request credential to decide if it's an update or an insertion
  // and do the actions necessary
  for (let credential of credentials) {
    // find the same credential method index form the new credentials to be updated
    let sameMethodCredentialIndex = newCredentials.findIndex(
      (element) => element.method == credential.method
    );
    // if found same credential method update it
    // else add credential to the new credentials
    if (sameMethodCredentialIndex != -1) {
      newCredentials[sameMethodCredentialIndex] =
        credentialsHandler.updateCredential(
          newCredentials[sameMethodCredentialIndex],
          credential
        );
    } else {
      newCredentials.push(credentialsHandler.createCredential(credential));
    }
  }
  return newCredentials;
}

module.exports = update;
