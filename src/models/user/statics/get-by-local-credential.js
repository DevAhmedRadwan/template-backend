module.exports = function getByLocalCredential(email) {
  // get user by email
  return this.findOne({
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
