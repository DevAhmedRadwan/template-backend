module.exports = function appBuilder(dependances) {
  // init express
  const express = require("express");
  const app = express();

  // disabling express default headers
  app.disable("x-powered-by");

  // init middleware
  const cors = require("cors");
  const corsOptions = require("./configs/cors");
  app.use(cors(corsOptions));

  // init body parser
  const cookieParser = require("cookie-parser");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // initialize session
  const mongoStore = require("connect-mongo");
  const sessionBuilder = require("./configs/session");
  sessionBuilder(app, mongoStore);

  // initalize passport
  const passportBuilder = require("./middlewares/passport");
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
