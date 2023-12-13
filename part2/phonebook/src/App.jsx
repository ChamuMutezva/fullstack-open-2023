import { useState } from "react";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import PersonsList from "./components/Persons";

function App() {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phone: "040-123456", id: 1 },
        { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
    ]);
    const formData = {
        name: "",
        phone: "",
    };
    const [newPerson, setNewPerson] = useState(formData);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayData, setDisplayData] = useState(persons);
    // const [newPhone, setNewPhone] = useState("");
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
                persons.concat({ name: newPerson.name, phone: newPerson.phone })
            );
            setDisplayData(
                persons.concat({ name: newPerson.name, phone: newPerson.phone })
            );
            setNewPerson({ ...newPerson, name: "", phone: "" });
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
        //   if (e.target.value !== "") {
        //       return setPersons(filter);
        //   }
        return setDisplayData(filter);
    };

    const { name, phone } = newPerson;
    return (
        <div className="flex flex-col gap-8 bg-sky-100 rounded-lg p-8 shadow m-4 max-w-md">
            <h2 className="text-2xl font-[900]">Phonebook</h2>

            <Search searchTerm={searchTerm} filterChange={filterChange} />
            <AddPerson
                handleSubmit={handleSubmit}
                onChange={onChange}
                phone={phone}
                name={name}
            />

            <PersonsList displayData={displayData} />
        </div>
    );
}

export default App;
