const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const database = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`MongoDB connection: ${database.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
