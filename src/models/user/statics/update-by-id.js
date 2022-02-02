const mongoose = require("mongoose");

module.exports = async function updateById(userId, user) {
  // extract all the emails
  let emails = user.credentials.map(
    (credential) =>
      credential.loginData.find((element) => element.key == "email").value
  );
  let query = {
    _id: {
      $ne: mongoose.Types.ObjectId(userId),
    },
    credentials: {
      $elemMatch: {
        loginData: {
          $elemMatch: {
            key: "email",
            value: { $in: emails },
          },
        },
      },
    },
  };
  // check if any user has the same credential
  let usersWithSameCredential = await this.find(query);
  // if found a user with the same credential throw an error
  if (usersWithSameCredential.length > 0) {
    throw new Error(`This credential already in use!`);
  }
  return await this.updateOne({ _id: userId }, user);
};
