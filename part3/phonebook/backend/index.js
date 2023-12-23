/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.get("/", (request, response) => {
    response.send(`<h1>Phonebook page</h1>`);
});

app.get("/info", (request, response) => {
    response.send(`<div>
    <h2>Phonebook has info for ${Person.length} people</h2>
    <p>${new Date()}</p>
    </div>`);
});
// Sat Dec 23 2023 03:11:21 GMT+0200 (South Africa Standard Time)

// get all people in phonebook
app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

// update a record
app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
    })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

app.get("/api/info", (request, response) => {
    response.send(`<div>
    <p>Phonebook has info for ${Person.length} people</p>
    <p>${new Date()}</p>
    </div>`);
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

// delete a person from phonebook
app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

const generateId = () => Math.floor(Math.random() * 10000);

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    // eslint-disable-next-line no-unused-vars
    morgan.token("body", (req, res) => {
        JSON.stringify(req.body);
    });

    app.use(
        morgan(
            ":method :url :status :res[content-length] - :response-time ms :body"
        )
    );

    if (!body.name) {
        return response.status(400).json({
            error: "name is missing",
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: "phone number is missing",
        });
    }

    const exists = Person.findOne({
        name: body.name,
    });

    if (exists) {
        app.put("/api/persons/:id", (request, response, next) => {
            const body = request.body;

            const person = {
                name: body.name,
                number: body.number,
            };

            Person.findByIdAndUpdate(request.params.id, person, { new: true })
                .then((updatedPerson) => {
                    response.json(updatedPerson);
                })
                .catch((error) => next(error));
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    });

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
