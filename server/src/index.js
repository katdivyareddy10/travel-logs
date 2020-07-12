const express = require("express");
const morgan = require("morgan"); // middleware logger for incoming network requests
const helmet = require("helmet"); // remove response headers for security
const cors = require("cors"); // for allowing cross origin requests
const middlewares = require("./middlewares");
const mongoose = require("mongoose");
const logs = require("./api/logs");

require("dotenv").config(); //dotenv takes your file .env and reads it to create environment vars.

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json()); //built-in middleware function in Express that parses incoming requests payload/formdata/body with JSON payloads and is based on body-parser.

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/logs", logs);

//Not found middleware (Not found only)
app.use(middlewares.notFound);

//Error middleware (Generic errors)
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1991;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
