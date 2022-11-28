const express = require("express");
const amqp = require("amqplib/callback_api");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

const createApp = () => {
  const app = express();
  const productMainRoutes = require("../src/routes/productMainRoutes");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors(corsOptions));

  app.use("/products", productMainRoutes);

  app.use(errorHandler);

  return app;
};

module.exports = createApp;
