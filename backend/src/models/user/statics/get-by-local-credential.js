const mongoose = require("mongoose");

module.exports = async function getByLocalCredential(email) {
  // get the user model
  let userModel = mongoose.model("user");
  // get user by email
  return await userModel.findOne({
    credentials: {
      $elemMatch: {
        loginData: {
          $elemMatch: {
            key: "email",
            value: email,
          },
        },
      },
    },
  });
};
