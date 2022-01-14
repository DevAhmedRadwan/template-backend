// init the database
const database = require("./configs/database");
database
  .then(() => {
    console.log("Database connection succeeded!");
  })
  .catch(() => {
    console.log("Database connection failed!");
  });

// import appBuilder
const appBuilder = require("./app");

// importing dependances
const models = require("./models");
const services = require("./services");

// inject dependances
const app = appBuilder({ models: models, services: services });

// init the docs server
const swagger = require("./docs/swagger");
swagger(app, "/docs");

// init the server
const http = require("http");
const { NODE_ENV, PORT } = require("./configs/env");
const server = http.createServer(app);

// start server
server.listen(PORT, function () {
  console.log(
    `App listening on http://[${server.address().address}]:${
      server.address().port
    }`
  );
  if (NODE_ENV == "development") {
    console.log(
      `Docs listening on http://[${server.address().address}]:${
        server.address().port
      }/docs`
    );
  }
});
