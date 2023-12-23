/* eslint-disable react/prop-types */

function PersonsList({ displayData, handleDeletePerson }) {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {displayData.map((person) => (
                    <li key={person.id}>
                        <p>
                            {person.name} {person.number}
                        </p>
                        <button
                            onClick={() => handleDeletePerson(person.id)}
                            className="rounded-lg bg-slate-900 text-white p-2 min-w-[4rem]"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PersonsList;
