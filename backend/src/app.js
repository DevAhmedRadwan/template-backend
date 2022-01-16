module.exports = function appBuilder(dependances) {
  // init express
  const express = require("express");
  const app = express();

  // disabling express default headers
  app.disable("x-powered-by");

  // init middleware
  const cors = require("cors");
  const corsOptions = require("./configs/cors");
  const cookieParser = require("cookie-parser");
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // initialize session
  const MongoStore = require("connect-mongo");
  const sessionBuilder = require("./configs/session");
  sessionBuilder(app, MongoStore);

  // initalize passport
  const passportBuilder = require("./configs/passport/passport");
  passportBuilder(app);

  // adding routes and injecting dependency
  const routes = require("./routes/routes");
  const dependencyInjector = require("./middlewares/dependencyInjector");
  app.use("/", dependencyInjector(dependances), routes);

  // init error handling middlewares
  const generalErrorHandler = require("./middlewares/error-handlers/general-error-handler");
  const mongooseErrorHandler = require("./middlewares/error-handlers/mongoose-error-handler");
  app.use(mongooseErrorHandler);
  app.use(generalErrorHandler);

  // export app
  return app;
};
