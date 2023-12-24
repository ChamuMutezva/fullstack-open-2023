const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");

mongoose.set("strictQuery", false);

mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use(blogRouter)
module.exports = app;
