/* eslint-disable no-undef */
const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Password should be included");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://dbAdmin:${password}@cluster0.0ewnz.mongodb.net/phonebook`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
});

const Person = mongoose.model("Person", phonebookSchema);

if (process.argv.length === 3) {
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(person);
        });
        mongoose.connection.close();
    });
} else {
    const person = new Person({
        id: Math.floor(Math.random() * 1000),
        name: process.argv[3],
        number: process.argv[4],
    });

    person.save().then((result) => {
        console.log(
            `added ${result.name} number ${result.number} to phonebook`
        );
        mongoose.connection.close();
    });
}
