const session = require("express-session");
const {
  SESSION_COOKIE_SECRET,
  SESSION_COOKIE_MAXAGE,
  SESSION_MONGODB_URL,
  SESSION_MONGODB_COLLECTION_NAME,
} = require("./env");

module.exports = (app, MongoStore) => {
  const sessionStore = MongoStore.create({
    mongoUrl: SESSION_MONGODB_URL,
    collectionName: SESSION_MONGODB_COLLECTION_NAME,
    mongoOptions: {
      useUnifiedTopology: true,
    },
  });
  app.use(
    session({
      secret: SESSION_COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: SESSION_COOKIE_MAXAGE,
      },
    })
  );
};
