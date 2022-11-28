require("dotenv").config();
const connectDatabase = require("./src/config/dbConnection.js");
const createApp = require("./src/setupServer.js");
const PORT = process.env.PORT || 5000;

connectDatabase();
const app = createApp();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
