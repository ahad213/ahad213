const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectionMongo = require("./config/db");
const ErrorHandler = require("./middleware/error");

const bootcamps = require("./routes/bootcamp");
// Load env vars

dotenv.config({ path: "./config/config.env" });

// Connect to database

connectionMongo();

const app = express();

// body parser for json data
app.use(express.json());
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamp", bootcamps);

app.use(ErrorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${port}
    `.brightMagenta,
  );
});

//Handle unhandled rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  server.close(() => process.exit(1));
});
