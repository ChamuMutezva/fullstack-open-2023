import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import PersonsList from "./components/Persons";
import personService from "./services/persons";

function App() {
    const [persons, setPersons] = useState([]);
    const formData = {
        name: "",
        number: "",
    };
    const [newPerson, setNewPerson] = useState(formData);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayData, setDisplayData] = useState(persons);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            console.log("promise fulfilled");
            setPersons(initialPersons);
            setDisplayData(initialPersons);
        });
    }, []);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(persons);
        // Find if person is already in phonebook
        const exist = persons.find(
            (person) =>
                person.name.toLowerCase() === newPerson.name.toLowerCase()
        );
        console.log(exist);
        if (exist) {
            // check if the person object and if new number is the same as number in obj
            if (exist && exist.number !== newPerson.number) {
                console.log(newPerson.number);

                // if true , create a new object
                const changedPerson = {
                    ...exist,
                    number: newPerson.number,
                };
                console.log(changedPerson);
                // update a single person details
                if (
                    window.confirm(
                        `${exist.name} is already in phonebook, replace old number with new one`
                    )
                ) {
                    personService
                        .update(exist.id, changedPerson)
                        .then((returnedPerson) => {
                            setPersons(
                                persons.map((person) =>
                                    person.id !== exist.id
                                        ? person
                                        : returnedPerson
                                )
                            );
                            setDisplayData(
                                persons.map((person) =>
                                    person.id !== exist.id
                                        ? person
                                        : returnedPerson
                                )
                            );
                            setNewPerson({
                                ...newPerson,
                                name: "",
                                number: "",
                            });
                            setErrorMessage(
                                `${exist.name}'s phone number has been updated`
                            );
                            setTimeout(() => {
                                setErrorMessage(null);
                            }, 5000);
                        })
                        .catch(() => {
                            setErrorMessage(
                                `${exist.name}'s exist in the database`
                            );
                            setTimeout(() => {
                                setErrorMessage(null);
                            }, 5000);
                        });
                }
            } else {
                alert(`${newPerson.name} is already added to the phonebook`);
                setNewPerson({ ...newPerson, name: "", number: "" });
                setErrorMessage(
                    `${newPerson.name} is already added to the phonebook`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }
        } else {
            personService
                .create(newPerson)
                .then((returnedPerson) => {
                    console.log(returnedPerson);
                    setPersons(persons.concat(returnedPerson));
                    setDisplayData(persons.concat(returnedPerson));
                    setNewPerson({ ...newPerson, name: "", number: "" });
                    setErrorMessage(
                        `${newPerson.name} has been added to the phonebook`
                    );
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                })
                .catch((error) => {                  
                    setErrorMessage(error.response.data.error);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setNewPerson({
            ...newPerson,
            [name]: value,
        });
    };
    const filterChange = (e) => {
        console.log(e.target.value);
        setSearchTerm(e.target.value);
        const filter = persons.filter((person) => {
            return person.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        console.log(filter);

        return setDisplayData(filter);
    };

    const handleDeletePerson = (id) => {
        const personFilter = persons.find((target) => target.id === id);
        if (
            window.confirm(`Do you really want to delete ${personFilter.name}?`)
        ) {
            setPersons(persons.filter((person) => person.id !== id));
            console.log(personFilter);
            setDisplayData(persons.filter((person) => person.id !== id));
            personService.deletePerson(id).then(personFilter);
            setErrorMessage(
                `${personFilter.name} has been removed from phonebook`
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const { name, number } = newPerson;
    return (
        <div className="flex flex-col gap-8 bg-sky-100 rounded-lg p-8 shadow m-4 max-w-md">
            <h2 className="text-2xl font-[900]">Phonebook</h2>

            <Search searchTerm={searchTerm} filterChange={filterChange} />
            <AddPerson
                handleSubmit={handleSubmit}
                onChange={onChange}
                number={number}
                name={name}
                errorMessage={errorMessage}
            />

            <PersonsList
                displayData={displayData}
                handleDeletePerson={handleDeletePerson}
            />
        </div>
    );
}

export default App;
