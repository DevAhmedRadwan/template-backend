const session = require("express-session");
const {
  SESSION_COOKIE_SECRET,
  SESSION_COOKIE_MAXAGE,
  SESSION_MONGODB_URL,
  SESSION_MONGODB_COLLECTION_NAME,
} = require("./env");

module.exports = (app, mongoStore) => {
  const sessionStore = mongoStore.create({
    mongoUrl: SESSION_MONGODB_URL,
    collectionName: SESSION_MONGODB_COLLECTION_NAME,
    mongoOptions: {
      useUnifiedTopology: true,
    },
  });
  app.use(
    session({
      resave: false,
      store: sessionStore,
      saveUninitialized: true,
      secret: SESSION_COOKIE_SECRET,
      cookie: {
        maxAge: SESSION_COOKIE_MAXAGE,
      },
    })
  );
};
