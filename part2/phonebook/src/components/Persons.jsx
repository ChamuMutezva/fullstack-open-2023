/* eslint-disable react/prop-types */

function PersonsList({ displayData }) {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {displayData.map((person, idx) => (
                    <li key={idx}>
                        <p>
                            {person.name} {person.phone}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PersonsList;
