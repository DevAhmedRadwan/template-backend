const LocalStrategy = require("passport-local").Strategy;

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

// injecting dependancies
module.exports = ({ userModel, validPassword }) => {
  const verifyCallback = (email, password, done) => {
    userModel
      .getByLocalCredential(email)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        const localLoginData = user.parseLoginData("local");

        const isValid = validPassword(
          password,
          localLoginData.hash,
          localLoginData.salt
        );

        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
  };

  const strategy = new LocalStrategy(customFields, verifyCallback);

  return strategy;
};
