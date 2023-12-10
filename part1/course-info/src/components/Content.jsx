/* eslint-disable react/prop-types */
import Part from "./Part";

function Content({ parts }) {
    console.log(parts);
    return (
        <div>
            {parts.map((part) => (
                <Part
                    key={part.name}
                    name={part.name}
                    exercise={part.exercises}
                />
            ))}
        </div>
    );
}

export default Content;
