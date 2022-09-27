const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const connectionMongo = require("./config/db");
const ErrorHandler = require("./middleware/error");

// Load env vars

dotenv.config({ path: "./config/config.env" });

// Connect to database

connectionMongo();

const app = express();

// body parser for json data
app.use(express.json());

//Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, "public")));
//Routes
const bootcamps = require("./routes/bootcamp");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

app.use("/api/v1/bootcamp", bootcamps);
app.use("/api/v1/course", courses);
app.use("/api/v1/auth", auth);

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
