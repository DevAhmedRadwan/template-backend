module.exports = async function register(user) {
  // if this user has no credential throw an error
  if (user.credentials.length != 1) {
    throw new Error(`any new register must has only one credential`);
  }
  // get the credential email
  let email = user.credentials[0].loginData.find(
    (pair) => pair.key == "email"
  ).value;
  // check if any user has the same credential
  let usersWithSameCredential = await this.find({
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
  // if found a user with the same credential throw an error
  if (usersWithSameCredential.length > 0) {
    throw new Error(`this credential already in use`);
  }
  return await this.create(user);
};
