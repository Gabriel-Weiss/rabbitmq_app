require("dotenv").config();
const connectAndConsume = require("./src/config/amqpConnection.js");
const connectDatabase = require("./src/config/dbConnection.js");
const createApp = require("./src/setupApp.js");
const PORT = process.env.PORT || 5001;

connectDatabase();
const app = createApp();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

connectAndConsume("product_created");
connectAndConsume("product_removed");
