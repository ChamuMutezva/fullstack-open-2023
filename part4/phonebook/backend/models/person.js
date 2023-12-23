/* eslint-disable no-undef */
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGO_URI;

console.log("connnecting to database");

mongoose
    .connect(url)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

const phonebookSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{6,9}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: [true, "User phone number required"],
    },
});

phonebookSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Person", phonebookSchema);
