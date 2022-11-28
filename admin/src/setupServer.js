const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

const createApp = () => {
  const app = express();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsOptions));
  app.use("/products", require("./routes/productRoutes"));

  app.use(errorHandler);

  return app;
};

module.exports = createApp;
