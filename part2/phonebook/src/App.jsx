import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import PersonsList from "./components/Persons";

function App() {
    const [persons, setPersons] = useState([]);
    const formData = {
        name: "",
        number: "",
    };
    const [newPerson, setNewPerson] = useState(formData);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayData, setDisplayData] = useState(persons);
    
    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((response) => {
            console.log("promise fulfilled");
            setPersons(response.data);
            setDisplayData(response.data)
        });
    }, []);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const exist = persons.find(
            (person) =>
                person.name.toLowerCase() === newPerson.name.toLowerCase()
        );
        console.log(exist);
        if (exist) {
            alert(`${newPerson.name} is already added to the phonebook`);
            setNewPerson({ ...newPerson, name: "" });
        } else {
            setPersons(
                persons.concat({ name: newPerson.name, number: newPerson.number })
            );
            setDisplayData(
                persons.concat({ name: newPerson.name, number: newPerson.number })
            );
            setNewPerson({ ...newPerson, name: "", number: "" });
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
            />

            <PersonsList displayData={displayData } />
        </div>
    );
}

export default App;
