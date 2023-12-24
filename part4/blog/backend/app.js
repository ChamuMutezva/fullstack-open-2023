const config = require("./utils/config");
const middleware = require("./utils/middleware")
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use(blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
