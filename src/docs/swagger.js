const path = require("path");
const { NODE_ENV, PORT } = require("../configs/env");

module.exports = (app, doc_route) => {
  if (NODE_ENV == "development") {
    const swaggerJsDoc = require("swagger-jsdoc");
    const swaggerUI = require("swagger-ui-express");
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "template-backend",
          version: "1.0.0",
          description: "this is template-backend",
        },
        servers: [
          {
            url: `http://[::]:${PORT}`,
            description: "template-backend api",
          },
        ],
      },
      apis: [path.join(__dirname, "./**/*.yml")],
    };

    const specs = swaggerJsDoc(options);

    app.use(doc_route, swaggerUI.serve, swaggerUI.setup(specs));
  }
};
