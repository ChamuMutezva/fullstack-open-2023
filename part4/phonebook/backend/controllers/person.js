const personsRouter = require("express").Router()
const Person = require("../models/person")

// get all people in phonebook
personsRouter.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

// update a record
personsRouter.put("/api/persons/:id", (request, response, next) => {
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

personsRouter.get("/api/persons/:id", (request, response, next) => {
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
personsRouter.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

const generateId = () => Math.floor(Math.random() * 10000);

personsRouter.post("/api/persons", (request, response, next) => {
    const body = request.body;

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
        personsRouter.put("/api/persons/:id", (request, response, next) => {
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

module.exports = personsRouter