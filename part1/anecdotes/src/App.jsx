import { useState } from "react";

function App() {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
    });
    const [maximum, setMaximum] = useState(0);
    const randomise = () => {
        const num = Math.floor(Math.random() * anecdotes.length);
        setSelected(num);
    };

    const vote = () => {
        const updatedPoints = {
            ...points,
            [selected]: (points[selected] += 1),
        };
        setPoints(updatedPoints);

        console.log(points);
        const highestValue = Object.keys(points).reduce((a, b) =>
            points[a] > points[b] ? a : b
        );
        console.log(highestValue, points[highestValue]);
        setMaximum(highestValue);
    };

    return (
        <div className="flex flex-col gap-8 bg-sky-100 rounded-lg p-8 shadow m-4 max-w-md">
            <h1 className="text-3xl font-[900]">Anecdotes</h1>
            <div>
                <h2 className="text-2xl font-[900]">Anecdotes of the day</h2>
                <p>{anecdotes[selected]}</p>
                <p>has {points[selected]} votes</p>
                <div className="my-4 flex gap-4">
                    <button
                        onClick={vote}
                        className="rounded-lg bg-slate-900 text-white p-2 min-w-[8rem]"
                    >
                        vote
                    </button>
                    <button
                        onClick={randomise}
                        className="rounded-lg bg-slate-900 text-white p-2"
                    >
                        Next anecdote
                    </button>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-[900]">
                    Anecdotes with most votes
                </h2>
                <p>{anecdotes[maximum]}</p>
                <p>has {points[maximum]} votes</p>
            </div>
        </div>
    );
}

export default App;
