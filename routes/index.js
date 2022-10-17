/**
 * @description: Root route
 */

const dbroutes  = require("./dbroutes")
const cusineroutes =  require("./cusineroutes")
module.exports = function (app) {
  // app.use("/", swaggerroutes)
  app.use("/api",cusineroutes)
  app.use("/api", dbroutes)
  // Executes if invalid route is triggered
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
};
