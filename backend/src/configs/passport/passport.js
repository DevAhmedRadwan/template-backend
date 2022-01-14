const passport = require("passport");
const LocalStrategyBuilder = require("./passport-local-strategy");

const userModel = require("../../models/user");
const { validPassword } = require("../../util/password");

// injecting dependancies
module.exports = (app) => {
  // initializing stratgies
  const localStrategy = LocalStrategyBuilder({
    userModel: userModel,
    validPassword: validPassword,
  });

  // add stratgies
  passport.use(localStrategy);

  // configuring user data serializing and data deserializing
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    User.findById(userId)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });

  app.use(passport.initialize());
  app.use(passport.session());

};
