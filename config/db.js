const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionMongo = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
  console.log(
    `MongoDB Connected: ${connectionMongo.connection.host}`.brightGreen
      .underline,
  );
};

module.exports = connectDB;
