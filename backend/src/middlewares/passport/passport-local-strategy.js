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

        const isValid = validPassword(
          password,
          user.getLocalCredentialHash(),
          user.getLocalCredentialSalt()
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
