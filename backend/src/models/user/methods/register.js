const mongoose = require("mongoose");

module.exports = async function register() {
  // if this user has no credential throw an error
  if (this.credentials.length != 1) {
    throw new Error(`Any new regester must has only one credential!`);
  }
  // get the user model
  let userModel = mongoose.model("user");
  // check if any user has the same credential
  let usersWithSameCredential = await userModel.find({
    credential: this.credential,
  });
  // if found a user with the same credential throw an error
  if (usersWithSameCredential.length > 0) {
    throw new Error(`This credential already in use!`);
  }
  return this.save();
};
