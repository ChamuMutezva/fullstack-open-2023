require("dotenv").config();
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
require("express-async-errors");

if (process.env.NODE_ENV.trim("") === "test") {
    console.log(process.env.NODE_ENV);
    app.use("/api/testing", testingRouter);
}

mongoose.set("strictQuery", false);

logger.info("connecting to database!!!");

logger.info(config.MONGODB_URI);
logger.info(process.env.NODE_ENV); 
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB...");
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (request, response) => {
    response.send("<h1> Notes practice project </h1>");
});

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
